import express from "express";
import {
  showCartByUser,
  addItemToCart,
  removeItemFromCart,
  addquantityItemToCart,
  removequantityItemFromCart,
} from "../controllers/CartController.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();
// Routes
router.get("/:id", verifyToken, showCartByUser); // Show cart for a specific user
router.post("/additemtocart/:id", verifyToken, addItemToCart); // Add item in items.productId for a specific user
router.post("/removeitemfromcart/:id", verifyToken, removeItemFromCart); // Remove items in items.productId for a specific user
router.post("/addquantityitemtocart/:id", verifyToken, addquantityItemToCart); 
router.post("/removequantityitemfromcart/:id",
  verifyToken,
  removequantityItemFromCart
); 
export default router;
