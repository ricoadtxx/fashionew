import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import paymentRoutes from "./routes/payment.route.js";
import notificationRoutes from "./routes/notification.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import usersRoutes from "./routes/users.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config({ path: path.resolve("./env") });

const app = express();
const PORT = process.env.PORT || 2000;

// ✅ Pastikan JSON parsing dilakukan sebelum middleware lainnya
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// ✅ Middleware CORS yang optimal
app.use(
	cors({
		origin: process.env.FRONTEND_URL, // Izinkan hanya frontend yang terdaftar
		credentials: true, // Izinkan pengiriman cookie/token
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Pastikan POST diizinkan
		allowedHeaders: ["Content-Type", "Authorization"], // Pastikan header ini tidak terblokir
	})
);

// ✅ Tangani preflight request (OPTIONS)
app.options("*", (req, res) => {
	res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS, PATCH"
	);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	return res.sendStatus(200);
});

// ✅ Daftarkan Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", usersRoutes);

// ✅ Pastikan server terhubung ke database
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectDB();
});
