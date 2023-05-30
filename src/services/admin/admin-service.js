const AdminModel = require("../../Models/admin/admin-model");
const busTypModel = require("../../Models/admin/bus-type-model");
const locationModel = require("../../Models/admin/location-model");
const BusModel = require("../../Models/bus-owner/bus-model");
const ComplaintModel = require("../../Models/user/complaint-model");

const AdminService = {
  getAdmin: async (email) => {
    return await AdminModel.findOne({ email });
  },

  ApproveBus: async (_id, update) => {
    return await BusModel.findOneAndUpdate({ _id }, update, { new: true });
  },

  getBus: async (_id) => {
    return await BusModel.findOne({ _id });
  },

  listAllComplaints: async () => {
    return await ComplaintModel.find()
      .populate({ path:"user", select: "-password" })
      .populate("bus");
  },

  listAllBuses: async () => {
    return await BusModel.find({ approved: true }).populate({
      path: "bus_owner",
      select: "-password",
    });
  },

  createLocation:async(body)=>{
    return await locationModel.create(body)
  },

  createBusType:async(body)=>{
    return await busTypModel.create(body)
  },

  getBusType:async(bus_type)=>{
    return await busTypModel.findOne({bus_type})
  },

  getLocation:async(location)=>{
    return await locationModel.findOne({location})
  }

};

module.exports = AdminService;
