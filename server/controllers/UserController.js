import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../utils/emailSender.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(errorHandler(400, "Veuillez fournir tous les champs requis !"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, "Cet email est déjà utilisé !"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const verificationToken = crypto.randomBytes(20).toString("hex");
    
    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword,
      emailVerificationToken: verificationToken
    });
    
    const user = await newUser.save();
    
    // Envoyer l'email de vérification
    
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = newUser._doc;
    res.cookie("_id", user._id , { httpOnly: true });
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json({
        success: true,
        message: "Inscription réussie. Veuillez vérifier votre email.",
        user: rest
      });
  } catch (error) {
    next(errorHandler(500, error));
  }
};


const getProfile = async (req, res, next) => {
  const token =
    req.cookies && req.cookies.access_token ? req.cookies.access_token : null;
  if (!token) return next(errorHandler(401, "Unauthorized token"));
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    const validUser = await User.findById(req.cookies._id)
    res.json(validUser);
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser)
      return next(
        errorHandler(404, "User not found! Wrong credentials! email")
      );
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(401, "Wrong credentials! password"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("_id", validUser._id, { httpOnly: true });
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        message: "login successful",
        user: rest
      });
  } catch (error) {
    next(errorHandler(500,error));
  }
};
const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("_id");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err); // Forward the error to error handling middleware
  }
};

const updateUserbyadmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Delete an user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      return next(errorHandler(400, "Lien de vérification invalide ou expiré"));
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.status(200)
      .json({
        success: true,
        message: "Email vérifié avec succès"
      });
  } catch (error) {
    next(error);
  }
};


const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "Aucun utilisateur trouvé avec cet email"));
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    await sendPasswordResetEmail(user.email, resetToken);

    res.status(200).json({
      success: true,
      message: "Email de réinitialisation envoyé",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        errorHandler(400, "Lien de réinitialisation invalide ou expiré")
      );
    }

    // Update password
    user.password = bcryptjs.hashSync(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Mot de passe réinitialisé avec succès",
    });
  } catch (error) {
    next(errorHandler(500, error));
  }
};



export {
  login,
  register,
  logout,
  getUsers,
  updateUserbyadmin,
  deleteUser,
  getProfile,
  verifyEmail,
  forgotPassword,
  resetPassword
};
