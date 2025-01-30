import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
	const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15m",
	});

	const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});

	return { accessToken, refreshToken };
};

const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 15 * 60 * 1000, // 15 menit
	});

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
	});
};

export const signup = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		const existUser = await User.findOne({ email });

		if (existUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const user = await User.create({ email, password, name });

		const { accessToken, refreshToken } = generateToken(user._id);

		user.refreshToken = refreshToken;
		await user.save();

		setCookies(res, accessToken, refreshToken);

		return res.status(201).json({
			user: {
				_id: user._id,
				email: user.email,
				name: user.name,
				role: user.role,
				refreshToken: user.refreshToken,
			},
			message: "User created successfully",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Cari user berdasarkan email
		const user = await User.findOne({ email });

		// Jika user tidak ditemukan atau password tidak sesuai
		if (!user || !(await user.comparePassword(password))) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		// Generate accessToken dan refreshToken
		const { accessToken, refreshToken } = generateToken(user._id);

		// Simpan refreshToken di database
		user.refreshToken = refreshToken;
		await user.save();

		// Set cookies
		setCookies(res, accessToken, refreshToken);

		// Kirim response
		res.status(200).json({
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			message: "Logged in successfully",
		});
	} catch (error) {
		console.log("Error in sign in controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (refreshToken) {
			const decoded = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET
			);

			const user = await User.findById(decoded.id);
			user.refreshToken = "";
			await user.save();
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");

		res.json({ message: "Logout successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		// Verifikasi token
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const user = await User.findById(decoded.id);

		if (!user || user.refreshToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		// Periksa apakah refresh token sudah kadaluarsa
		const isTokenExpired = Date.now() >= decoded.exp * 1000;
		if (isTokenExpired) {
			return res.status(401).json({ message: "Refresh token expired" });
		}

		// Buat access token dan refresh token baru
		const { accessToken, refreshToken: newRefreshToken } = generateToken(
			user._id
		);

		// Simpan refresh token baru di database
		user.refreshToken = newRefreshToken;
		await user.save();

		// Set cookies baru
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000, // 15 menit
		});

		res.cookie("refreshToken", newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
		});

		return res.json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.log("Error in refreshToken controller:", error.message);
		return res
			.status(500)
			.json({ message: "Server error", error: error.message });
	}
};

export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getAllUser = async (req, res) => {
	try {
		const users = await User.find({ role: "user" });
		res.json({ users });
	} catch (error) {
		console.error("Error in getAllProducts controller", error.message);
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};
