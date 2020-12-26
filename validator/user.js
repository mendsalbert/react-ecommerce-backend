const { check } = require("express-validator");

exports.userSignInValidator = [
  check("name", "Please Name is required").not().isEmpty(),
  check("email", "Please Email is required").isEmail(),
  check(
    "password",
    "Please enter a password with more than six characters"
  ).isLength({ min: 6 }),
];

exports.userLogInValidator = [
  check("email", "Please Email is required").isEmail(),
  check("password", "Please Password is required").not().isEmpty(),
];

exports.userForgetPassword = [
  check("email", "Please Email is required").isEmail(),
];

exports.userResetPassword = [
  check("password", "Please password is required")
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
];
