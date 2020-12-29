const express = require("express");
const router = express.Router();
const {
  addTagController,
  editTagController,
  allTagController,
} = require("../controllers/tag");
const { authenticated } = require("../middlewares/authenticate");
const { runValidation } = require("../validator/index");
const { addTagValidation } = require("../validator/tag");

//@route -- POST api/tag/add-tag
//@desc -- add a product tag
//@access -- public
router.post(
  "/add-tag",
  addTagValidation,
  runValidation,
  authenticated,
  addTagController
);

//@route -- POST api/tag/edit-tag
//@desc -- edit a product tag
//@access -- public
router.post(
  "/edit-tag/:id",
  addTagValidation,
  runValidation,
  authenticated,
  editTagController
);

//@route -- GET api/tag/all-tags
//@desc -- all a product tag
//@access -- public
router.get("/all-tags", authenticated, allTagController);

module.exports = router;
