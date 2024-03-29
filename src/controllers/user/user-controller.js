const { CommonErrorMessage, Role } = require("../../constants/variables");
const { userByEmail, createUser, listBuses, createComplaint, getUserBYid, getbus, listlocation, listUserDestination, listBusTypeservice, listbusForComplaintService } = require("../../services/user/user-services");
const { getPasswordHash, verifyPassword } = require("../../utils/bcrypt");
const { getCurrentDateandTime, dateToUtc } = require("../../utils/moment-handler");
const { createToken } = require("../../utils/token-handler");

const UserController = {
  register: async (request, response) => {
    try {
      let body = request.body;
      if (!body?.email || !body?.password || !body.name) {
        return response.status(400).json({ msg: CommonErrorMessage.required_fields, status: false });
      }
      body.email = body.email.toLowerCase();
      if (await userByEmail(body?.email)) {
        return response.status(400).json({ msg: CommonErrorMessage.user_already_exist, status: false });
      }
      body.password = await getPasswordHash(body?.password);
      let create_user = {
        email: body?.email,
        name: body?.name,
        role: Role.USER,
        password: body?.password,
      };
      const user = await createUser(create_user);
      const token = await createToken(user);
      response.status(200).json({ status: true, token });
    } catch (e) {
        console.log(e)
        response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false })
    }
  },

  login: async (request, response) => {
    try {
      let body = request.body;
      if (!body?.email || !body?.password) {
        return response.status(400).json({ msg: CommonErrorMessage.required_fields, status: false });
      }
      body.email = body.email?.toLowerCase();
      let user = await userByEmail(body?.email);
      if (!user) {
        return response.status(400).json({ msg: CommonErrorMessage.user_not_found, status: false });
      }
      const validate_user = await verifyPassword(user?.password, body?.password);
      if (!validate_user) {
        return response.status(400).json({ msg: CommonErrorMessage.incorrect_password, status: false });
      }
      const token = await createToken(user);
      response.status(200).json({ status: true, token });  
    } catch (e) {
        console.log(e)
        response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false })
    }
  },

  listBus: async (request, response) => {
    try {
      const location = request.query.location;
      const from = request.query.from;
      const to = request.query.to;
      const bus_type = request.query.bus_type;
      const buses = await listBuses(location, from, to, bus_type);
      response.status(200).json({ status: true, buses }); 
    } catch (e) {
        response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false })
    }
  },

  createComplaint: async (request, response) => {
    try {
      let body = request.body;
      let userId = request.payload?.user;
      if (!body?.bus || !body?.problem) {
        return response.status(400).json({ msg: CommonErrorMessage.required_fields, status: false });
      }
      let bus = await getbus(body?.bus);
      if (!bus) {
        return response.status(400).json({ msg: CommonErrorMessage.bus_not_found, status: false });
      }
      let create_complaint = {
        problem: body?.problem,
        comment: body?.comment,
        created: dateToUtc(getCurrentDateandTime()),
        bus: bus?._id,
        user: userId,
      };
      let complaint = await createComplaint(create_complaint);
      response.status(200).json({ status: true, complaint }); 
    } catch (e) {
        console.log(e)
        response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false })
    }
  },

  profileDetail: async (request, response) => {
    try {
      let user_id = request.payload.user;
      const user = await getUserBYid(user_id);
      if (!user) {
        return response.status(400).json({ msg: CommonErrorMessage.user_not_found, status: false });
      }
       response.status(200).json({status:true,user})
    } catch (e) {
        response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false })
    }
  },

  listLocation:async(request,response)=>{
    try{
       const locations=await listlocation()
       response.status(200).json({status:true,locations})
    }catch(e){
      console.log(e)
      response.status(500).json({msg:CommonErrorMessage.internal_server,status:false})
    }
  },
  listDestination: async (request, response) => {
    try {
      const location = request.query.location;
      let destinations = await listUserDestination(location);
      const routeFromSet = new Set();
    const routeToSet = new Set();

    const RouteFrom = [];
    const RouteTo = [];

    destinations.forEach((destination) => {
      const { route_from, route_to } = destination;

      if (!routeFromSet.has(route_from)) {
        RouteFrom.push(route_from);
        routeFromSet.add(route_from);
      }

      if (!routeToSet.has(route_to)) {
        RouteTo.push(route_to);
        routeToSet.add(route_to);
      }
    });
      response.status(200).json({ status: true,RouteFrom,RouteTo })
    } catch (e) {
      console.log(e);
      response.status(500).json({ msg: CommonErrorMessage.internal_server, status: false });
    }
  },
  
  listBusType:async(request,response)=>{
    try{
      const location=request.query.location
      const busTypes=await listBusTypeservice(location)
      response.status(200).json({status:true,busTypes})
    }catch(e){
      console.log(e)
      response.status(500).json({msg:CommonErrorMessage.internal_server,status:false})
    }
  },

  listBusForComplaint: async (request, response) => {
    try {
      let buses = await listbusForComplaintService();
      let uniqueBuses = buses.filter((bus, index, self) =>
        index === self.findIndex((b) => b.name === bus.name)
      );
      response.status(200).json({ status: true, buses: uniqueBuses });
    } catch (e) {
      response
        .status(500)
        .json({ msg: CommonErrorMessage.internal_server, status: false });
    }
  }
}

module.exports = UserController;
