import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/webp"
    ) {
      callback(null, "server/images/categories");
    } else {
      callback(new Error("Type de fichier non autorisé"), false);
    }
  },
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    const filename = `category-${Date.now()}${ext}`;
    callback(null, filename);
  },
});

const fileFilter = (req, file, callback) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Seules les images sont autorisées"), false);
  }
};

export const categoryUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
