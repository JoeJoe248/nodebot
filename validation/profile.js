const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  //only do this for required fields
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.cookingType = !isEmpty(data.cookingType) ? data.cookingType : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (Validator.isEmpty(data.cookingType)) {
    errors.cookingType =
      "Cooking Type (i.e. GMG, Big Green Egg, etc.) is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
