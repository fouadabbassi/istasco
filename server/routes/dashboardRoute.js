// routes/dashboardRoute.js
import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyToken , verifyAdmin, getDashboardData);

export default router;