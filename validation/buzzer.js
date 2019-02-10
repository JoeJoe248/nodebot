const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBuzzerData(data) {
  let errors = {};

  data.state = !isEmpty(data.state) ? data.state : "";

  if (Validator.isEmpty(data.state)) {
    errors.state = "State is required";
  }

  /*if (!Validator.isLength(data.equipmentName, { min: 2, max: 50 })) {
    //console.log("equipmentName: " + equipmentName);
    errors.equipmentName = "Equipment name must be between 2 and 50 characters";
  }
  */
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
