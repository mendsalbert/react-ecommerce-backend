const { check } = require("express-validator");

exports.addTagValidation = [
  check("tag", "Please Name is required").not().isEmpty().trim(),
];
