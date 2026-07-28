const Category = require("../models/Category");
const mongoose = require("mongoose");

// GET All Categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({
        message: error.message,
    });
  }
};

// CREATE Category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({
            message: "Category name is required",
        });
    }

    const categoryName = name.trim();

    const exists = await Category.findOne({
      name: { $regex: new RegExp(`^${categoryName}$`, "i") },
    });

    if (exists) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await Category.create({
        name: categoryName,
    });

    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({
        message: error.message,
    });
  }
};

// UPDATE Category
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({
            message: "Category name is required",
        });
    }

    const categoryName = name.trim();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "Invalid category id",
        });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const duplicate = await Category.findOne({
      _id: { $ne: req.params.id },
      name: { $regex: new RegExp(`^${categoryName}$`, "i") },
    });

    if (duplicate) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    category.name = categoryName;

    await category.save();

    return res.json(category);
  } catch (error) {
    return res.status(500).json({
        message: error.message,
    });
  }
};

// DELETE Category
const deleteCategory = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "Invalid category id",
        });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    await category.deleteOne();

    return res.json({
        message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
        message: error.message,
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};