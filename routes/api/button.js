const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Load Input Validation
const validateButtonData = require("../../validation/button");

// Load Equipment model
const Button = require("../../models/Button");

// @route   GET api/routes/test
// @desc    Test getting all equipment
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "test get button works" }));

// @route   POST api/routes/addState
// @desc    Add Equipment one at a time
// @access  Public
router.post("/addState", (req, res) => {
  //ultimately will validate input with validation
  const { errors, isValid } = validateButtonData.body;

  // check validaiton
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const newButtonState = new Button({
      state: req.body.state
    });

    newButtonState.save().then(button => res.json(button));
  }
});

module.exports = router;
