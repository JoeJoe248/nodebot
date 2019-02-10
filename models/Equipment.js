const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create the Equipment Schema
const EquipmentSchema = new Schema({
  equipmentName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Equipment = mongoose.model("equipment", EquipmentSchema);
