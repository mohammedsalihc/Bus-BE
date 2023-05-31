const { CommonErrorMessage } = require("../../constants/variables");
const {getAdmin,ApproveBus,listAllComplaints,listAllBuses,getBus, createLocation, getBusType,createBusType, getLocation, getAdminById}=require('../../services/admin/admin-service')
const {getPasswordHash,verifyPassword}=require('../../utils/bcrypt')
const {createToken}=require('../../utils/token-handler')
const AdminController = {
  login: async (request, response) => {
    try {
      let body = request.body;
      if (!body?.email || !body?.password) {
        return response.status(400).json({ msg: CommonErroMessages.required_fields, status: false });
      }
      body.email = body?.email.toLowerCase();
      let admin = await getAdmin(body?.email);
      if (!admin) {
        return response.status(400).json({ msg: CommonErroMessages.user_not_found, status: false });
      }
      const validateAdmin = await verifyPassword(
        admin?.password,
        body?.password
      );
      if (!validateAdmin) {
        return response.status(400).json({ msg: CommonErrorMessage.incorrect_password, status: false });
      }
      const token = await createToken(admin);
       response.status(200).json({ status: true, token });
    } catch (e) {
        response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false });
    }
  },

  approveBus: async (request, response) => {
    try {
      const busId = request.params.id;
      const bus = await getBus(busId);
      if (!bus) {
        return response.status(400).json({ msg: CommonErrorMessage.bus_not_found, status: false });
      }
      const approveBus = await ApproveBus(busId, { approved: true });
      response.status(200).json({ status: true, approveBus });
    } catch (e) {
        response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false });
    }
  },

  listAllComplaints: async (request, response) => {
    try {
      const page = request.query.page;
      let complaints = await listAllComplaints();
      response.status(200).json({ status: true, complaints });
    } catch (e) {
        console.log(e)
        response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false });
    }
  },

  listAllBuses: async (request, response) => {
    try {
      const page = request.query.page;
      let buses = await listAllBuses();
      response.status(200).json({ status: true, buses });
    } catch (e) {
        response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false });
    }
  },

  addLocation:async(request,response)=>{
    try{
      let body=request.body;
      if(!body?.location){
        return response.status(400).json({ msg: CommonErrorMessage.required_fields, status: false }); 
      }
      let create_location={
        location:body?.location
      }
      const valid_location=await getLocation(body?.location)
      if(valid_location){
        return response.status(400).json({ msg: CommonErrorMessage.location_exist, status: false });  
      }
      const location= await createLocation(create_location)
      response.status(200).json({ status: true, location });
    }catch(e){
      console.log(e)
      response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false });
    }
  },

  createBusTypes:async(request,response)=>{
    try{
      let body=request.body;
      if(!body?.bus_type){
        return response.status(400).json({ msg: CommonErrorMessage.required_fields, status: false }); 
      }
      const valid_type=await getBusType(body?.bus_type)
      if(valid_type){
        return response.status(400).json({ msg: CommonErrorMessage.bus_type_already_exist, status: false }); 
      }
      let create_bus_type={
        bus_type:body?.bus_type
      }
      const bus_type=await createBusType(create_bus_type)
      response.status(200).json({ status: true, bus_type });
    }catch(e){
      console.log(e)
      response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false });
    }
  },

  profileDetail:async(request,response)=>{
    try{
       let admin_id=request.payload.user;
       const admin=await getAdminById(admin_id)
       if(!admin){
        return response.status(400).json({ msg: CommonErrorMessage.user_not_found, status: false });
       }  
       response.status(200).json({status:true,admin})                                                                          
    }catch(e){
      console.log(e)
      response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false });
    }
  }
};

module.exports = AdminController;
