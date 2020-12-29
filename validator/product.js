const { check } = require("express-validator");

exports.addProductValidation = [
  check("name", "Please Name is required").not().isEmpty().trim(),
  check("category", "Please Category is required").not().isEmpty(),
  check("tag", "Please Tag is required").not().isEmpty(),
  check("price", "Please Price is required").not().isEmpty().trim(),
];
