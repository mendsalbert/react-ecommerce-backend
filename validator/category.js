const { check } = require("express-validator");

exports.addCategoryValidation = [
  check("category", "Please Name is required").not().isEmpty().trim(),
  check("subCategory", "Please sub category is required")
    .not()
    .isEmpty()
    .trim(),
];
