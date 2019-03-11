const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CookLogSchema = new Schema({
  analogReading: {
    type: Number,
    required: true
  },
  temperatureCelcius: {
    type: Number,
    required: true
  },
  temperatureFahrenheit: {
    type: Number,
    required: false
  },
  deviceId: {
    type: String,
    required: true
  },
  cookDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = CookLog = mongoose.model("cookLog", CookLogSchema);
