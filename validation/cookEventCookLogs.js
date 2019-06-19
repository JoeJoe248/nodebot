const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCookEventCookLogs(data) {
  let errors = {};

  data.status = !isEmpty(data.status) ? data.status : "";

  if (Validator.isEmpty(data.status)) {
    errors.status = "Need a status.";
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
