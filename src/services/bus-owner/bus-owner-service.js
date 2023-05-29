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
};

module.exports = busService;