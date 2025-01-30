import dotenv from "dotenv";
import midtransClient from "midtrans-client";

dotenv.config();

// Inisialisasi Midtrans Snap client
const snap = new midtransClient.Snap({
	isProduction: false, // Gunakan `true` untuk lingkungan production
	serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export const createPayment = async (parameter) => {
	try {
		const transaction = await snap.createTransaction(parameter);
		return transaction;
	} catch (error) {
		console.error("Error creating transaction:", error);
		throw error;
	}
};

export const checkPaymentStatus = async (orderId) => {
	try {
		const statusResponse = await snap.transaction.status(orderId);
		return statusResponse;
	} catch (error) {
		console.error("Error checking transaction status:", error);
		throw error;
	}
};

export const verifyNotification = async (notificationJson) => {
	try {
		const statusResponse = await snap.transaction.notification(
			notificationJson
		);
		return statusResponse;
	} catch (error) {
		console.error("Error verifying notification:", error);
		throw error;
	}
};
