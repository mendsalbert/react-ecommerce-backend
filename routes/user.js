const express = require("express");
const router = express.Router();
const {
  registerUserController,
  forgetPasswordController,
  getAllUsersController,
} = require("../controllers/user");
const { runValidation } = require("../validator/index");
const {
  userSignInValidator,
  userForgetPassword,
} = require("../validator/user");

//@route -- POST api/user
//@desc -- Register a user
//@access -- Public

router.post("/", userSignInValidator, runValidation, registerUserController);
router.get("/all-users", getAllUsersController);
router.get("/get-user", getAllUsersController);
// router.post("/", registerUserController);
//@route -- POST api/user/forget-password
//@desc -- Forget password of a user
//@access -- Public
router.post(
  "/forget-password",
  userForgetPassword,
  runValidation,
  forgetPasswordController
);

module.exports = router;
