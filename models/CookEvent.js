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
  deviceBoards: [
    {
      deviceId: {
        type: String
      }
    }
  ],
  meatType: {
    type: String
  },
  meatWeight: {
    type: String
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
  cookNotes: {
    type: String
  },
  purchasePlace: {
    type: String
  },
  purchasePrice: {
    type: String
  },
  meatProbeInd: {
    type: Boolean,
    default: false
  },
  archiveInd: {
    type: Boolean,
    default: false
  },
  archiveIndDate: {
    type: Date,
    default: null
  },
  cookLog: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "cookLog",
        required: true
      },
      user: {
        type: String,
        required: false
      },
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
    }
  ],
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = CookEvent = mongoose.model("cookEvents", CookEventSchema);
