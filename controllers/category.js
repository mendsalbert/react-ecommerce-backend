const { json } = require("express");
const Category = require("../models/Category");

exports.addCategoryController = async (req, res) => {
  try {
    const { category } = req.body;
    var cat = new Category({
      category: category,
    });
    var savedCategory = await cat.save();
    res.json(savedCategory);
  } catch (error) {
    res.json(error);
  }
};

exports.isCategoryExist = async (req, res) => {
  try {
    const { category } = req.body;
    const categoryToLowerCase = category.toLowerCase();
    const cate = await Category.find({ category: categoryToLowerCase });
    if (cate.length > 0) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  } catch (error) {
    res.json(error);
  }
};
exports.editCategoryController = async (req, res) => {
  try {
    const { category, subCategory } = req.body;
    const categoryId = req.params.id;
    //##subcategories should be transformed into an array at the front end
    const editedCategory = await Category.findByIdAndUpdate(categoryId, {
      category: category,
      subCategory: subCategory.split(","),
    });
    res.json(editedCategory);
  } catch (error) {
    res.json(error);
  }
};

exports.allCategoryController = async (req, res) => {
  try {
    let allCategory = await Category.find({});
    //smart display for front End
    const smartDisplay = () => {
      for (var i = 0; i < allCategory.length; i++) {
        console.log("Main Category :=========" + allCategory[i].category);
        allCategory[i].subCategory.map((sub) => {
          console.log("sub-cat========" + sub);
        });
      }
    };

    res.json(allCategory);
  } catch (error) {
    res.json(error);
  }
};

exports.deleteCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    console.log(categoryId);
    const deleteCategory = await Category.findByIdAndRemove(categoryId);
    res.json(deleteCategory);
  } catch (error) {
    res.json(error);
  }
};
