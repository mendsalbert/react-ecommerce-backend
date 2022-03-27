const express = require("express");
const router = express.Router();
const { addProductValidation } = require("../validator/product");
const { runValidation } = require("../validator/index");
const { authenticated } = require("../middlewares/authenticate");
const {
  addProductController,
  editProductController,
  deleteProductController,
  allProductsController,
  searchProductController,
  getProductController,
} = require("../controllers/product");

//!!FUTURE ROUTES ***** GET-SINGLE-PRODUCT

//@route -- POST api/product/add-product
//@desc -- add a product
//@access -- Public
router.post(
  "/add-product",
  addProductValidation,
  // runValidation,
  // authenticated,
  addProductController
);

//@route -- POST api/product/edit-product
//@desc -- edit a product
//@access -- Public
router.post(
  "/edit-product/:id",
  addProductValidation,
  // runValidation,
  // authenticated,
  editProductController
);

//@route -- POST api/product/delete-product
//@desc -- delete a product
//@access -- Public
router.post("/delete-product/:id", authenticated, deleteProductController);

//@route -- GET api/product/all-product
//@desc -- get all products
//@access -- Public
router.get(
  "/all-products",
  //  authenticated,
  allProductsController
);

router.get(
  "/get-product/:id",
  //  authenticated,
  getProductController
);

router.post("/search-product/:search", searchProductController);
module.exports = router;
