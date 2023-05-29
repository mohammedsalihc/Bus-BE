const { CommonErrorMessage } = require("../../constants/variables");
const {getAdmin,ApproveBus,listAllComplaints,listAllBuses,getBus}=require('../../services/admin/admin-service')
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
};

module.exports = AdminController;