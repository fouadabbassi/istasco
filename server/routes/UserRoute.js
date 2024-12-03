import express from "express";
import {
  login,
  register,
  logout,
  getUsers,
  updateUserbyadmin,
  deleteUser,
  getProfile,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/UserController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/", verifyToken, verifyAdmin, getUsers);
router.get("/profile", verifyToken, getProfile);
router.post("/updatebyadmin/:id", verifyToken, verifyAdmin, updateUserbyadmin);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
