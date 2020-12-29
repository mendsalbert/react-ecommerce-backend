const Category = require("../models/Category");

exports.addCategoryController = async (req, res) => {
  try {
    const { category } = req.body;
    //##subcategories should be transformed into an array at the front end
    const subCategory = ["t-shirt", "top", "shorts"];
    var cat = new Category({
      category: category,
      subCategory: subCategory,
    });
    var savedCategory = await cat.save();
    res.json(savedCategory);
  } catch (error) {
    res.json(error);
  }
};

exports.editCategoryController = async (req, res) => {
  try {
    const { category } = req.body;
    const productId = req.params.id;
    //##subcategories should be transformed into an array at the front end
    const subCategory = ["t-shirt", "top", "shorts"];
    const editedCategory = await Category.findByIdAndUpdate(productId, {
      category: category,
      subCategory: subCategory,
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
