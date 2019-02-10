const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEquipmentInput(data) {
  let errors = {};

  data.equipmentName = !isEmpty(data.equipmentName) ? data.equipmentName : "";

  if (Validator.isEmpty(data.equipmentName)) {
    errors.equipmentName = "Equipment is required";
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
