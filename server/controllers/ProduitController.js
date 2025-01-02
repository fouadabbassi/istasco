import { existsSync } from "fs";
import Produit from "../models/ProduitModel.js";
import { unlink } from "fs/promises"; // استخدم unlink لحذف الملفات

export const createProduit = async (req, res) => {
  try {
    const { name, description, price, categoryId, subcategoryId } = req.body;

    // التحقق من وجود الملفات (صور أو PDF)
    const images = req.files && req.files.images ? req.files.images : [];
    const pdf = req.files && req.files.pdf ? req.files.pdf[0].filename : null;

    // تحقق إذا لم يتم رفع أي من الصور أو PDF
    if (!images.length && !pdf) {
      return res
        .status(400)
        .json({ message: "Please upload at least one image or a PDF file." });
    }

    // تجهيز أسماء الصور
    const imageFilenames = images.map((file) => file.filename);

    // إنشاء المنتج الجديد
    const produit = new Produit({
      name,
      description,
      price,
      categoryId,
      subcategoryId,
      pdf: pdf, // حفظ مسار ملف PDF إذا وجد
      images: imageFilenames, // حفظ أسماء الصور
    });
    const produitRes = await produit.save();
    res.status(201).json({ success: true, produitRes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProduitsByTag = async (req, res) => {
  try {
    const tag = req.query.tag || "#one";

    const produits = await Produit.find({
      description: { $regex: tag, $options: "i" },
    })
      .limit(4);

    res.status(200).json({ success: true, produits });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la récupération des produits",
      });
  }
};


// Get all products
// Get all products with search functionality
export const getProduit = async (req, res) => {
  try {
    const filter = {};
    const sort = {};
    let skip = 0;
    let limit = 0;
    // البحث في الحقول (مثال: اسم المنتج أو الوصف)
    if (req.query.search) {
      const searchQuery = req.query.search;
      filter.$or = [
        { name: { $regex: searchQuery, $options: "i" } }, // بحث غير حساس لحالة الأحرف في الاسم
        { description: { $regex: searchQuery, $options: "i" } } // بحث غير حساس لحالة الأحرف في الوصف
      ];
    }

    // البحث بناءً على categoryId إذا كان موجودًا في query
    if (req.query.categoryId) {
      filter.categoryId = { $in: req.query.categoryId };
    }

    // البحث بناءً على subcategoryId إذا كان موجودًا في query
    if (req.query.subcategoryId) {
      filter.subcategoryId = { $in: req.query.subcategoryId };
    }

    // ترتيب النتائج بناءً على query
    if (req.query.sort) {
      sort[req.query.sort] = req.query.order ? (req.query.order === "asc" ? 1 : -1) : 1;
    }

    // التحديد على الصفحة والعدد
    if (req.query.page) {
      const page = req.query.page;
      skip = 6 * (page - 1);
      limit = 6;
    }

    // إجمالي المنتجات في القاعدة
    const totalDocs = await Produit.find(filter).countDocuments().exec();

    // جلب المنتجات بناءً على الفلاتر
    const produits = await Produit.find(filter)
      .sort(sort)
      .populate("categoryId subcategoryId")
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json({ "X-Total-Count": totalDocs, totalProduits: produits });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching products, please try again later" });
  }
};


// Show a single product
export const showProduit = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id).populate(
      "categoryId subcategoryId"
    );
    if (!produit) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, produit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Update a product
export const updateProduit = async (req, res) => {
  try {
    const { id } = req.params; // تأكد من استخدام req.params بدلاً من req.param
    const produit = await Produit.findById(id);

    if (!produit) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // حذف الصور القديمة إذا تم رفع صور جديدة
    if (req.files && req.files.images) {
      // حذف الصور القديمة من الخادم
      for (const image of produit.images) {
        try {
          await unlink(`server/images/produits/${image}`);
        } catch (err) {
          console.error(`Failed to delete image: ${image}`, err);
        }
      }
      const images = req.files.images || [];
      const imageFilenames = images.map((file) => file.filename);
      produit.images = imageFilenames || produit.images; // تحديث الصور إذا كانت موجودة
    }

    // حذف ملف PDF القديم إذا تم رفع ملف PDF جديد
    if (req.files && req.files.pdf) {
      const pdf = produit.pdf;
      if (pdf) {
        try {
          await unlink(`server/pdfs/${pdf}`);
        } catch (err) {
          console.error(`Failed to delete PDF: ${pdf}`, err);
        }
      }
      const newPdf = req.files.pdf ? req.files.pdf[0].filename : null;
      produit.pdf = newPdf || produit.pdf; // تحديث ملف PDF إذا كان موجودًا
    }

    // تحديث باقي الحقول إذا كانت موجودة في req.body
    produit.name = req.body.name || produit.name;
    produit.description = req.body.description || produit.description;
    produit.price = req.body.price || produit.price;
    produit.categoryId = req.body.categoryId || produit.categoryId;
    produit.subcategoryId = req.body.subcategoryId || produit.subcategoryId;

    // حفظ التحديثات
    await produit.save();

    // إرسال استجابة النجاح
    res.json({ success: true, produit });
  } catch (error) {
    // التعامل مع الأخطاء
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Remove images from the server
    for (const image of produit.images) {
      const imagePath = `server/images/produits/${image}`;
      if (existsSync(imagePath)) {
        await unlink(imagePath);
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    }

    // Remove the PDF from the server if it exists
    if (produit.pdf) {
      const pdfPath = `server/pdfs/${produit.pdf}`;
      if (existsSync(pdfPath)) {
        await unlink(pdfPath);
      } else {
        console.log(`PDF not found: ${pdfPath}`);
      }
    }

    // استخدام findByIdAndDelete لحذف المنتج
    const deletedProduit = await Produit.findByIdAndDelete(req.params.id);
    res.json(deletedProduit);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


