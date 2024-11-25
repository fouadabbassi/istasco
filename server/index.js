import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import User from "./routes/UserRoute.js";
import Category from "./routes/CategoryRoute.js";
import Produit from "./routes/ProduitRoute.js";
import Subcategory from "./routes/SubcategoryRoute.js";
import Wishlist from "./routes/WishlistRoute.js";
import Order from "./routes/OrderRoute.js";
import Cart from "./routes/CartRoute.js";
import Contact from "./routes/ContactRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";


// Initialize dotenv to load environment variables
dotenv.config();
// Initialize express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(cookieParser());
app.use(express.static("server"));
// CORS configuration
const allowedOrigins = [
  'https://istasco.net',
  'https://www.istasco.net'
];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // إذا كنت تستعمل الكوكيز أو sessions
}));
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the app if unable to connect
  });

// Routes
app.use("/api/dashboard", dashboardRoute);
app.use("/api/user", User);
app.use("/api/category", Category);
app.use("/api/produit", Produit);
app.use("/api/subcategory", Subcategory);
app.use("/api/wishlist", Wishlist);
app.use("/api/order", Order);
app.use("/api/cart", Cart);
app.use("/api/contact", Contact);

// Start the server on port 3033
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res,next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
