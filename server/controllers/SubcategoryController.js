import Category from "../models/CategoryModel.js";
import Subcategory from "../models/SubcategoryModel.js";


// Get all subcategories
export const getSubcategory = async (req, res, next) => {
  try {
    const subcategories = await Subcategory.find()
      .sort({ updatedAt: -1 })
      .populate("categoryId");
    res.status(200).json(subcategories);
  } catch (err) {
    next(err); // تمرير الخطأ إلى الميدل وير الخاصة بمعالجة الأخطاء
  }
};

// Get subcategories by category
export const getSubcategoryByCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.find({id});
    if (category) {
      const subcategories = await Subcategory.find({
        categoryId: id,
      }).sort({ updatedAt: -1 });
      if (subcategories.length === 0) {
        return res
          .status(404)
          .json({ message: "No subcategories found for this category" });
      }
      res.status(200).json(subcategories);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
    } catch (err) {
      next(err);
    }
};

// Create a new subcategory
export const createSubcategory = async (req, res, next) => {
  const newSubcategory = new Subcategory(req.body);
  try {
    const savedSubcategory = await newSubcategory.save();
    res.status(201).json(savedSubcategory);
  } catch (err) {
    next(err);
  }
};

// Update a subcategory
export const updateSubcategory = async (req, res, next) => {
  try {
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.status(200).json(updatedSubcategory);
  } catch (err) {
    next(err);
  }
};

// Delete a subcategory
export const deleteSubcategory = async (req, res, next) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(
      req.params.id
    );
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.json(subcategory);
  } catch (err) {
    next(err);
  }
};