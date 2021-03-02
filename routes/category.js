const express = require("express");
const router = express.Router();
const { authenticated } = require("../middlewares/authenticate");
const {
  addCategoryController,
  editCategoryController,
  allCategoryController,
  deleteCategoryController,
} = require("../controllers/category");

const { runValidation } = require("../validator/index");
const { addCategoryValidation } = require("../validator/category");

//@route -- POST api/category/add-category
//@desc -- add a product category
//@access -- public
router.post(
  "/add-category/",
  addCategoryValidation,
  runValidation,
  authenticated,
  addCategoryController
);

//@route -- POST api/category/edit-category/id
//@desc -- edit a category
//@access -- private
router.post(
  "/edit-category/:id",
  addCategoryValidation,
  runValidation,
  authenticated,
  editCategoryController
);

//@route -- POST api/category/delete-category/id
//@desc -- delete a category
//@access -- public
router.delete("/delete-category/:id", authenticated, deleteCategoryController);

//@route -- POST api/category/all-category
//@desc -- list all items in a category
//@access -- public
router.get("/all-category", allCategoryController);

module.exports = router;
