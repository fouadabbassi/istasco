import express from "express";
import {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getSingleOrder,
  getCustomerOrders
} from "../controllers/OrderController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

// Routes
router.post("/create", verifyToken, createOrder);
router.get("/", verifyToken, getOrder);
router.get("/:id", verifyToken, getSingleOrder);
router.get("/customer/:userId", verifyToken, getCustomerOrders);
router.patch("/:id", verifyToken, verifyAdmin, updateOrder);
router.delete("/:id", verifyToken, verifyAdmin, deleteOrder);

export default router;