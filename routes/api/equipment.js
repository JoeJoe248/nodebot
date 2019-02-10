const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Load Input Validation
const validateEquipmentInput = require("../../validation/equipment");

// Load Equipment model
const Equipment = require("../../models/Equipment");

// @route   GET api/routes/test
// @desc    Test getting all equipment
// @access  Public
router.get("/test", (req, res) =>
  res.json({ msg: "test get equipment works" })
);

// @route   GET api/routes/getEquipment
// @desc    Return all equipment
// @access  Public
router.get("/getAllEquipment", (req, res) => {
  Equipment.find()
    .sort({ equipmentName: 1 })
    .then(equipment => res.json(equipment))
    .catch(err => res.status(404).json({ msg: "no equipment found" }));
});

// @route   POST api/routes/addEquipment
// @desc    Add Equipment one at a time
// @access  Public
router.post("/addEquipment", (req, res) => {
  //ultimately will validate input with validation
  const { errors, isValid } = validateEquipmentInput(req.body);

  // check validaiton
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Equipment.findOne({ equipmentName: req.body.equipmentName }).then(
    equipment => {
      if (equipment) {
        errors.equipmentName = "Equipment name already exists";
        return res.status(400).json(errors);
      } else {
        const newEquipment = new Equipment({
          equipmentName: req.body.equipmentName
        });

        newEquipment.save().then(equipment => res.json(equipment));
        //console.log("reached end of equipment");
      }
    }
  );
});

// @route   DELETE api/equipment/:id
// @desc    delete by id
// @access  Public

router.delete("/:id", function(req, res) {
  Equipment.findByIdAndDelete(req.params.id, function(err, equipment) {
    if (err)
      return res
        .status(500)
        .send("There was a problem deleting the equipment.");
    res
      .status(200)
      .send("Equipment Item: " + equipment.equipmentName + " was deleted.");
  });
});

module.exports = router;
