const { check } = require("express-validator");

exports.userSignInValidator = [
  check("name", "Please Name is required").not().isEmpty().trim(),
  check("email", "Please Email is required").isEmail().trim(),
  check("password", "Please enter a password with more than six characters")
    .isLength({ min: 6 })
    .trim(),
];

exports.userLogInValidator = [
  check("email", "Please Email is required").isEmail().trim(),
  check("password", "Please Password is required").not().isEmpty().trim(),
];

exports.userForgetPassword = [
  check("email", "Please Email is required").isEmail().trim(),
];

exports.userResetPassword = [
  check("password", "Please password is required")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .trim(),
];
