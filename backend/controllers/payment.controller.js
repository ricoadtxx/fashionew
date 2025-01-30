import { checkPaymentStatus, createPayment } from "../lib/midtrans.js";
import Order from "../models/order.model.js";

export const createCheckoutSession = async (req, res) => {
	try {
		const { products } = req.body;

		// Validasi input
		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		let totalAmount = 0;

		// Hitung total amount dan siapkan item details
		const itemDetails = products.map((product) => {
			const amount = product.price * product.quantity;
			totalAmount += amount;

			return {
				id: product._id,
				price: product.price,
				quantity: product.quantity,
				name: product.name,
			};
		});

		// Buat parameter untuk Midtrans
		const parameter = {
			transaction_details: {
				order_id: `ORDER-${Date.now()}`, // ID pesanan unik
				gross_amount: totalAmount, // Total jumlah pembayaran
			},
			item_details: itemDetails,
			customer_details: {
				first_name: req.user.name.split(" ")[0], // Ambil nama depan dari user
				last_name: req.user.name.split(" ")[1] || "", // Ambil nama belakang dari user
				email: req.user.email,
				phone: req.user.phone || "08123456789", // Default phone number jika tidak ada
			},
			custom_fields: {
				userId: req.user._id.toString(),
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			},
		};

		const transaction = await createPayment(parameter);

		// Kirim respons ke frontend
		res.status(200).json({
			token: transaction.token,
			redirect_url: transaction.redirect_url,
			totalAmount: totalAmount,
		});
	} catch (error) {
		console.error("Error creating checkout session:", error);
		res.status(500).json({
			message: "Error creating checkout session",
			error: error.message,
		});
	}
};

export const checkoutSuccess = async (req, res) => {
	try {
		const { order_id } = req.body; // Midtrans mengirim order_id dalam notifikasi

		// Ambil detail transaksi dari Midtrans menggunakan fungsi dari midtrans.js
		const transactionStatus = await checkPaymentStatus(order_id);

		if (transactionStatus.transaction_status === "settlement") {
			const customFields = transactionStatus.custom_fields;

			// Buat pesanan baru
			const products = JSON.parse(customFields.products);
			const newOrder = new Order({
				user: customFields.userId,
				products: products.map((product) => ({
					product: product.id,
					quantity: product.quantity,
					price: product.price,
				})),
				totalAmount: transactionStatus.gross_amount,
				midtransOrderId: order_id,
			});

			await newOrder.save();

			res.status(200).json({
				success: true,
				message: "Payment successful and order created.",
				orderId: newOrder._id,
			});
		} else {
			res
				.status(400)
				.json({ success: false, message: "Payment not yet completed" });
		}
	} catch (error) {
		console.error("Error processing successful checkout:", error);
		res.status(500).json({
			message: "Error processing successful checkout",
			error: error.message,
		});
	}
};
