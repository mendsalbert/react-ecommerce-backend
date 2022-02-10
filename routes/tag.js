const express = require("express");
const router = express.Router();
const {
  addTagController,
  editTagController,
  allTagController,
  deleteTagController,
  isTagExist,
} = require("../controllers/tag");
const { authenticated } = require("../middlewares/authenticate");
const { runValidation } = require("../validator/index");
const { addTagValidation } = require("../validator/tag");

//@route -- POST api/tag/add-tag
//@desc -- add a product tag
//@access -- private
router.post(
  "/add-tag",
  addTagValidation,
  runValidation,
  authenticated,
  addTagController
);

//@route -- POST api/tag/isTagExist
//@desc -- check if tag exist
//@access --- private
router.post(
  "/isTagExist",
  addTagValidation,
  runValidation,
  authenticated,
  isTagExist
);

//@route -- POST api/tag/edit-tag
//@desc -- edit a product tag
//@access -- private
router.post(
  "/edit-tag/:id",
  addTagValidation,
  runValidation,
  authenticated,
  editTagController
);

//@route -- POST api/tag/delete-tag
//@desc -- delete a product tag
//@access -- private
router.delete("/delete-tag/:id", authenticated, deleteTagController);

//@route -- GET api/tag/all-tags
//@desc -- all a product tag
//@access -- private
router.get("/all-tags", authenticated, allTagController);

module.exports = router;
