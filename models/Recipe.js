const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
//need to associate the user with the profile
const RecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, //associate the user by ID
    ref: "users"
  },
  recipeName: {
    type: String,
    max: 40,
    required: true
  },
  directions1: {
    type: String
  },
  directions2: {
    type: String
  },
  recipeURL: {
    type: String
  },
  suggestedTemp: {
    type: String
  },
  suggestedTime: {
    type: String
  },
  suggestedWood: {
    type: [String]
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = Recipe = mongoose.model("recipes", RecipeSchema);
