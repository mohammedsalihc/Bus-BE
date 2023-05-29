const mongoose = require("mongoose");
const { getCurrentDateandTime } = require("../../utils/moment-handler");

const complaintSchema = new mongoose.Schema({
  problem: { type: String, required: true },
  comment: { type: String },
  bus: { type: String, required: true, ref: "bus" },
  created: { type: Date, default: getCurrentDateandTime() },
  user: { type: String, required: true, ref: "user" },
});

const ComplaintModel = mongoose.model("complaint", complaintSchema);

module.exports = ComplaintModel;
