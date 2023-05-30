const { Router } = require("express");
const { accessPermission } = require("../../utils/token-handler");
const { Role } = require("../../constants/variables");
const { register, login, profileDetails, BusComplaints, BusRegistration, listLocation, listbus_type } = require("../../controllers/bus-owner/bus-owner-controller");
const router = Router();

router.post('/register',(req,res)=>register(req,res))

router.post('/login',(req,res)=>login(req,res))

router.post('/bus-registration',accessPermission([Role.BUS_OWNER]),(req,res)=>BusRegistration(req,res))

router.get('/bus-complaints',accessPermission([Role.BUS_OWNER]),(req,res)=>BusComplaints(req,res))

router.get('/profile-detail',accessPermission([Role.BUS_OWNER]),(req,res)=>profileDetails(req,res))

router.get('/list-location',accessPermission([Role.BUS_OWNER]),(req,res)=>listLocation(req,res))

router.get('/list-bus-type',accessPermission([Role.BUS_OWNER]),(req,res)=>listbus_type(req,res))

module.exports = router;
