const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
//need to associate the user with the profile
const CookEventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, //associate the user by ID
    ref: "users"
  },
  recipeId: {
    type: Schema.Types.ObjectId, //associate the recipes by ID
    ref: "recipes"
  },
  recipeName: {
    type: String
  },
  /*deviceId: {
    type: Schema.Types.ObjectId, //associate the deviceId by ID
    ref: "profile"
  },*/
  deviceId: {
    type: String
  },
  meatType: {
    type: String
  },
  meatWeight: {
    type: Number
  },
  totalCookTime: {
    type: String
  },
  minutesPerPound: {
    type: Number
  },
  cookRating: {
    type: String
  },
  ovenTemp: {
    type: String
  },
  cookState: {
    type: String
  },
  activeInd: {
    type: Boolean
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = CookEvent = mongoose.model("cookEvents", CookEventSchema);
