import express from "express";
import {
	signin,
	logout,
	signup,
	refreshToken,
	getProfile,
	getAllUser,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

router.get("/profile", protectRoute, getProfile);

router.get("/users", protectRoute, getAllUser);

export default router;
