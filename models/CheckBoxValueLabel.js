const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CheckBoxValueLabelSchema = new Schema({
  valueLabelCategory: {
    type: String
  },
  valueLabelItem: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = CheckBoxValueLabel = mongoose.model(
  "checkboxvaluelabels",
  CheckBoxValueLabelSchema
);
