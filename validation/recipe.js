const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRecipeInput(data) {
  let errors = {};

  //only do this for required fields
  data.recipeName = !isEmpty(data.recipeName) ? data.recipeName : "";

  if (!Validator.isLength(data.recipeName, { min: 2, max: 200 })) {
    errors.recipeName = "Recipe Name needs to between 2 and 200 characters";
  }

  if (Validator.isEmpty(data.recipeName)) {
    errors.recipeName = "Recipe Name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
