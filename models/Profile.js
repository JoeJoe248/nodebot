const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
//need to associate the user with the profile
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, //associate the user by ID
    ref: "users"
  },
  handle: {
    type: String,
    max: 40,
    required: true
  },
  bio: {
    type: String
  },
  cookingType: {
    type: [String],
    required: true
  },
  deviceType: {
    type: String
  },
  deviceId: {
    type: String
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
