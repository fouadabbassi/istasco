import Category from "../models/CategoryModel.js";
import { unlink } from "fs/promises";
import { existsSync } from "fs";

// Get all categories
export const getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    next(err); // Forward the error to error handling middleware
  }
};

// Create a new category
export const createCategory = async (req, res, next) => {
  
  try {
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "L'image est requise",
      });
    }

    const category = new Category({
      name,
      description,
      image: req.file.filename,
    });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    next(err);
  }
};

// Update a category fixed this
export const updateCategory = async (req, res, next) => {
  try {const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Catégorie non trouvée",
    });
  }
  if (req.file) {
    const oldImagePath = `server/images/categories/${category.image}`;
    if (existsSync(oldImagePath)) {
      await unlink(oldImagePath);
    }
    category.image = req.file.filename || oldImagePath ;
  }

  category.name = req.body.name || category.name;
  category.description = req.body.description || category.description;

  const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

// Delete a category fixed this
export const deleteCategory = async (req, res, next) => {
  try {
    
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Catégorie non trouvée",
      });
    }
    const imagePath = `server/images/categories/${category.image}`;
    if (existsSync(imagePath)) {
      await unlink(imagePath);
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};
