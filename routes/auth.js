const express = require("express");
const router = express.Router();

const {
  userLogInController,
  getLoggedInUser,
  userRestPasswordController,
} = require("../controllers/auth");
const { runValidation } = require("../validator/index");
const { userLogInValidator, userResetPassword } = require("../validator/user");
const { authenticated } = require("../middlewares/authenticate");

//@route -- GET api/auth
//@desc -- get logged in user
//@access -- private
router.get("/", authenticated, getLoggedInUser);

//@route -- POST api/auth
//@desc -- Authenticate a user
//@access -- public
router.post("/", userLogInValidator, runValidation, userLogInController);

//@route -- POST api/auth/reset-password
//@desc -- reset password
//@access -- private
router.post(
  "/reset-password/:reset_token",
  userResetPassword,
  runValidation,
  userRestPasswordController
);
module.exports = router;
