const mongoose = require("mongoose");


const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bus_type: { type: String, required: true },
  location: { type: String, required: true },
  route_from: { type: String, required: true },
  route_to: { type: String, required: true },
  wifi: { type: Boolean, default: false },
  air_condition: { type: Boolean, default: false },
  starting_time: { type: Date, required: true },
  ending_time: { type: Date, required: true },
  approved: { type: Boolean, default: false },
  bus_code: { type: String, required: true },
  bus_owner: { type: String, required: true, ref: "bus_owner" },
});

const BusModel = mongoose.model("bus", busSchema);

module.exports = BusModel;
