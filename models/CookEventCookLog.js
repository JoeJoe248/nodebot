const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
//need to associate the user with the profile
const CookEventCookLogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, //associate the user by ID
    ref: "users"
  },
  recipeId: {
    type: Schema.Types.ObjectId, //associate the recipes by ID
    ref: "recipes"
  },
  cookEventId: {
    type: Schema.Types.ObjectId,
    ref: "cookEvents"
  },
  cookLogId: {
    type: Schema.Types.ObjectId,
    ref: "cookLog"
  },
  deviceId: {
    type: String
  },
  status: {
    type: String
  },
  statusDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = CookEventCookLog = mongoose.model(
  "cookEventCookLogs",
  CookEventCookLogSchema
);
