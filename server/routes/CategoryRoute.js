import express from "express";
import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";
import { categoryUpload } from "../utils/categoryMulter.js";
const router = express.Router();
router.get("/", getCategory);
router.delete("/:id", verifyToken, verifyAdmin, deleteCategory);
router.post(
  "/create",
  verifyToken,
  verifyAdmin,
  categoryUpload.single("image"),
  createCategory
);
router.post(
  "/update/:id",
  verifyToken,
  verifyAdmin,
  categoryUpload.single("image"),
  updateCategory
);

export default router;
