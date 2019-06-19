const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCheckBoxValueLabelInput(data) {
  let errors = {};

  data.valueLabelCategory = !isEmpty(data.valueLabelCategory)
    ? data.valueLabelCategory
    : "";
  data.valueLabelItem = !isEmpty(data.valueLabelItem)
    ? data.valueLabelItem
    : "";

  if (Validator.isEmpty(data.valueLabelCategory)) {
    errors.valueLabelCategory = "Value Label Category is required";
  }

  if (Validator.isEmpty(data.valueLabelItem)) {
    errors.valueLabelItem = "Value Label Item is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
