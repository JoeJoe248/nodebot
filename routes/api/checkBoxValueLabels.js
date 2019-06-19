const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Validation
const validateCheckBoxValueLabelInput = require("../../validation/checkBoxValueLabels");

//Load CheckBoxValueLabel model
const CheckBoxValueLabel = require("../../models/CheckBoxValueLabel");
//const CheckBoxValueLabel = require("../../models/CheckBoxValueLabel");
//Load User model
const User = require("../../models/User");

//@route GET api/services/test
// @desc Tests services route
//@access Public
router.get("/test", (req, res) =>
  res.json({ msg: "checkBoxValueLabels route works" })
);

// @ route  GET api/services/activeCookEventValueLabels
// @desc    get active cookLog checkbox label
// @access  public
/*router.get("/activeCookEventValueLabels", (req, res) => {
  console.log("inside /activeCookEvent");
  CheckBoxValueLabel.find({ valueLabelCategory: "Active Cook Event" })
    .sort({ valueLabelItem: 1 })
    .then(services => res.json(services))
    .catch(err => res.status(404).json({ msg: "no value labels found" }));
  console.log("after catch");
});*/

router.get("/activeCookEventValueLabels", (req, res) => {
  const errors = {};
  //console.log("inside get call about to find data");
  CheckBoxValueLabel.find({ valueLabelCategory: "Active Cook Event" })
    .then(checkBoxValueLabels => {
      if (!checkBoxValueLabels) {
        errors.novaluelabels = "There are no value labels";
        return res.status(404).json(errors);
      }
      res.json(checkBoxValueLabels);
      //console.log("after find call");
    })
    .catch(err =>
      res.status(404).json({ checkBoxValueLabels: "there are no value labels" })
    );
});

//@route POST api/services/addCheckBoxValueLabel
//@desc create check box value label one item and category at a time
//@access Private

router.post("/addCheckBoxValueLabel", (req, res) => {
  console.log("inside /addCheckBoxValueLabel route");
  //ultimately will validate input with validation
  const { errors, isValid } = validateCheckBoxValueLabelInput(req.body);

  // check validaiton
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //console.log("about to find a value label category");
  CheckBoxValueLabel.find({
    valueLabelCategory: req.body.valueLabelCategory,
    valueLabelItem: req.body.valueLabelItem
  }).then;
  checkboxvaluelabels => {
    if (checkboxvaluelabels) {
      errors.valueLabelCategory =
        "Value Label Category and Value Label already exists";
      return res.status(400).json(errors);
    } else {
      //console.log("about add values to Mongo");
      const newCheckBoxValueLabel = new CheckBoxValueLabel({
        valueLabelCategory: req.body.valueLabelCategory,
        valueLabelItem: req.body.valueLabelItem
      });

      newCheckBoxValueLabel
        .save()
        .then(checkboxvaluelabels => res.json(checkboxvaluelabels));
      //console.log("reached end of checkboxvaluelabels");
    }
  };
});

module.exports = router;
