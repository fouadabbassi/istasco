import multer from "multer";
import path from "path";

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // تحديد المسار بناءً على نوع الملف
    if (file.mimetype === "application/pdf") {
      callback(null, "server/pdfs");
    } else if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/webp"
    ) {
      callback(null, "server/images/produits");
    } else {
      callback(
        new Error("Invalid file type. Only images and PDFs are allowed."),
        false
      );
    }
  },
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname); // الحصول على امتداد الملف
    const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

// File filter configuration
const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    callback(null, true); // السماح بقبول الملف
  } else {
    callback(
      new Error("Only PDF, jpg, png, webp , and jpeg formats are allowed."),
      false
    ); // رفض الملف
  }
};

// Export the multer configuration for both PDFs and images
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
