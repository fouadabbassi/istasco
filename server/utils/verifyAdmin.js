import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import User from "../models/UserModel.js";

export const verifyAdmin = (req, res, next) => {
  const token =
    req.cookies && req.cookies.access_token ? req.cookies.access_token : null;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    try {
      // Find the user in the database
      const user = await User.findById(decoded.id);

      if (!user) return next(errorHandler(404, "User not found"));

      // Check if the user has admin privileges
      if (user.role !== "admin")
        return next(errorHandler(403, "Access denied"));

      // Attach the user to the request object
      req.user = user;
      next();
    } catch (err) {
      return next(errorHandler(500, "Server error"));
    }
    
  });
};
