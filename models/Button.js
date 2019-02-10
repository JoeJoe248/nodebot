const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create the Equipment Schema
const ButtonSchema = new Schema({
  state: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Button = mongoose.model("button", ButtonSchema);
