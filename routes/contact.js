const express = require("express");
const Router = express.Router();
// const { authenticated } = require("../middlewares/authenticate");
const {
  addContactController,
  allContactController,
} = require("../controllers/contact");

//@route -- POST api/contact/add-contact/
//@desc -- add a contact
//@access -- public
Router.post("/add-contact", addContactController);

//@route -- POST api/contact/all-contact
//@desc -- list all items in a contact
//@access -- public
Router.get("/all-contacts", allContactController);

module.exports = Router;
