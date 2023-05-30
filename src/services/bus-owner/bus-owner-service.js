const busTypModel = require("../../Models/admin/bus-type-model");
const locationModel = require("../../Models/admin/location-model");
const BusModel = require("../../Models/bus-owner/bus-model");
const BusOwnerModel = require("../../Models/bus-owner/bus-owner-model");
const ComplaintModel = require("../../Models/user/complaint-model");

const busService = {
  getOwner: async (email) => {
    return await BusOwnerModel.findOne({ email });
  },

  createOwner: async (body) => {
    return await BusOwnerModel.create(body);
  },

  createBusService: async (body) => {
    const bus = await BusModel.create(body);
    return await BusModel.populate(bus, { path: 'bus_owner', select: '-password' });
  },

  findBusForOwner: async (bus_owner) => {
    return await BusModel.find({ bus_owner, approved: true });
  },

  collectComplaints: async (_ids) => {
    return await ComplaintModel.find({ bus: { $in: _ids } })
      .populate({ path: 'user', select: '-password' })
      .populate('bus');
  },

  getOwnerById: async (_id) => {
    return await BusOwnerModel.findOne({ _id }).select('-password');
  },

  listBusLoction:async()=>{
    return await locationModel.find()
  },

  listbustypeForowner:async(location)=>{
    return await busTypModel.find()
  }
};

module.exports = busService;
