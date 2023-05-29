const mongoose = require("mongoose");

const busOwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const BusOwnerModel = mongoose.model("bus_owner", busOwnerSchema);

module.exports = BusOwnerModel;
