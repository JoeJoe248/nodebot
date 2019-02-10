const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Load Input Validation
//const validateBuzzerData = require("../../validation/buzzer");

// Load Equipment model
const Buzzer = require("../../models/Buzzer");

// @route   GET api/routes/test
// @desc    Test getting all equipment
// @access  Public
router.get("/test", (req, res) =>
  res.json({ msg: "test get buzzer state works" })
);

// @route   POST api/routes/addState
// @desc    Add Equipment one at a time
// @access  Public
router.post("/addState", (req, res) => {
  //ultimately will validate input with validation
  //const { errors, isValid } = validateBuzzerData.body;

  // check validaition

  const newBuzzerState = new Buzzer({
    state: req.body.state
  });

  newBuzzerState.save().then(buzzer => res.json(buzzer));
});

module.exports = router;
