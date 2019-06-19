const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CookEventCookLogHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, //associate the user by ID
    ref: "users"
  },
  cookEventId: {
    type: Schema.Types.ObjectId, //associate the recipes by ID
    ref: "cookEvents"
  },
  analogReading: {
    type: Number,
    required: false
  },
  temperatureCelcius: {
    type: Number,
    required: false
  },
  temperatureFahrenheit: {
    type: Number,
    required: false
  },
  deviceId: {
    type: String,
    required: false
  },
  cookDate: {
    type: Date
  },
  cookLogHistoryDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = CookEventCookLogHistory = mongoose.model(
  "cookEventCookLogHistory",
  CookEventCookLogHistorySchema
);
