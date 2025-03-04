import express from "express";
import {
  createContact,
  getContact,
  deleteContact,
} from "../controllers/ContactController.js"; // Ensure the path is correct
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

// Routes
router.get("/", verifyToken, verifyAdmin, getContact); // Get all contact messages
router.delete("/:id", verifyToken, verifyAdmin, deleteContact); // Delete a contact message
router.post("/create", createContact); // Create a new contact message

export default router;
