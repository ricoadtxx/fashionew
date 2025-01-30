import { verifyNotification } from "../lib/midtrans.js";
import Order from "../models/order.model.js";

export const handleNotification = async (req, res) => {
	const notificationJson = req.body;

	try {
		// Verifikasi notifikasi menggunakan fungsi dari midTrans.js
		const statusResponse = await verifyNotification(notificationJson);

		const orderId = statusResponse.order_id;
		const transactionStatus = statusResponse.transaction_status;

		console.log(
			`Transaction status for order ${orderId}: ${transactionStatus}`
		);

		// Update status pesanan di database
		await Order.findByIdAndUpdate(orderId, {
			paymentStatus: transactionStatus, // Misalnya: "pending", "success", "failed"
		});

		res.status(200).send("Notification received");
	} catch (error) {
		console.error("Error handling notification:", error);
		res.status(500).send("Error handling notification");
	}
};
