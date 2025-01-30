import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getAllUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllUser);

export default router;
