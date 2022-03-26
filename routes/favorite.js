const express = require("express");
const Router = express.Router();
const { authenticated } = require("../middlewares/authenticate");
const {
  addFavoriteController,
  removeFavoriteController,
  allFavoriteController,
  getUserFavourite,
} = require("../controllers/favorite");

//@route -- POST api/favorite/add-favorite/pid
//@desc -- add a product to favorite
//@access -- public
Router.post("/add-favorite/:pid", authenticated, addFavoriteController);

//@route -- POST api/favorite/delete-favorite/id
//@desc -- delete a product from favorite
//@access -- public
Router.post("/delete-favorite/:id", authenticated, removeFavoriteController);

//@route -- POST api/favorite/all-favorite
//@desc -- list all items in a favorite
//@access -- public
Router.get("/all-favorite", authenticated, allFavoriteController);

Router.get("/user-favourites", authenticated, getUserFavourite);
module.exports = Router;
