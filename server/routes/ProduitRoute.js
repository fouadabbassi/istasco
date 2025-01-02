import express from "express";
import {
  createProduit,
  getProduit,
  showProduit,
  updateProduit,
  deleteProduit,
  getProduitsByTag,
} from "../controllers/ProduitController.js"; // Ensure the path is correct
import { upload } from "../utils/multer.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

// Routes
router.get("/", getProduit);
router.get("/produitbytag", getProduitsByTag);
router.get("/:id", showProduit);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduit);
router.post(
  "/create",
  verifyToken,
  verifyAdmin,
  upload.fields([
    { name: "images", maxCount: 5 }, // رفع عدة صور
    { name: "pdf", maxCount: 1 }, // رفع ملف PDF واحد
  ]),
  createProduit
);

router.post(
  "/update/:id",
  verifyToken,
  verifyAdmin,
  upload.fields([
    { name: "images", maxCount: 5 }, // رفع عدة صور
    { name: "pdf", maxCount: 1 }, // رفع ملف PDF واحد
  ]),
  updateProduit
);

export default router;
