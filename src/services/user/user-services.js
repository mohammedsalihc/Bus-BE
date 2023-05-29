const locationModel = require("../../Models/admin/location-model");
const BusModel = require("../../Models/bus-owner/bus-model");
const ComplaintModel = require("../../Models/user/complaint-model");
const UserModel = require("../../Models/user/user-model");

const userService = {
    userByEmail: async (email) => {
      return await UserModel.findOne({ email });
    },
  
    createUser: async (body) => {
      return await UserModel.create(body);
    },
  
    listBuses: async (location, route_from, route_to, bus_type) => {
      const query = { approved: true };
  
      if (location) {
        query.location = location;
      }
  
      if (route_from) {
        query.route_from = route_from;
      }
  
      if (route_to) {
        query.route_to = route_to;
      }
  
      if (bus_type) {
        query.bus_type = bus_type;
      }
  
      return await BusModel.find(query);
    },
  
    getbus: async (_id) => {
      return await BusModel.findOne({ _id, approved: true });
    },
  
    createComplaint: async (body) => {
      return await ComplaintModel.create(body);
    },
  
    getUserBYid: async (_id) => {
      return await UserModel.findOne({ _id }).select('-password');
    },

    listlocation:async()=>{
      return await locationModel.find()
    },

    listUserDestination:async(location)=>{
      return await BusModel.find({location}).select('route_from').select('route_to')
    }
  };
  
  module.exports = userService;