import express from "express";
import {
  showWishlistByUser,
  addItemToWishlist,
  removeItemFromWishlist,
} from "../controllers/WishlistController.js"; // Ensure the path is correct
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Routes
router.get("/:id", verifyToken, showWishlistByUser); // Show wishlist for a specific user
router.post("/additemtowishlist/:id", verifyToken, addItemToWishlist); // Add item in items.productId for a specific user
router.post("/removeitemfromwishlist/:id", verifyToken, removeItemFromWishlist); // Remove items in items.productId for a specific user
export default router;
