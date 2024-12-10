import express from "express";
import {
  getSubcategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategoryByCategory,
} from "../controllers/SubcategoryController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();
router.get("/", getSubcategory);
router.delete("/:id", verifyToken, verifyAdmin, deleteSubcategory);
router.post("/create", verifyToken, verifyAdmin, createSubcategory);
router.get("/bycategory/:id", getSubcategoryByCategory);
router.post("/update/:id", verifyToken, verifyAdmin, updateSubcategory);
export default router;
