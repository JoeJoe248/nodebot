const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create the Equipment Schema
const BuzzerSchema = new Schema({
  equipmentId: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Buzzer = mongoose.model("buzzer", BuzzerSchema);
