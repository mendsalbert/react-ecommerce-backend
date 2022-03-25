const express = require("express");
const Router = express.Router();
const { authenticated } = require("../middlewares/authenticate");
const {
  addCartController,
  removeCartController,
  allCartController,
} = require("../controllers/cart");

//@route -- POST api/cart/add-cart/pid
//@desc -- add a product to cart
//@access -- public
Router.post("/add-cart/:pid", authenticated, addCartController);

//@route -- POST api/cart/delete-cart/id
//@desc -- delete a product from cart
//@access -- public
Router.post("/delete-cart/:id", authenticated, removeCartController);

//@route -- POST api/cart/all-cart
//@desc -- list all items in a cart
//@access -- public
Router.get("/all-cart", authenticated, allCartController);

module.exports = Router;
