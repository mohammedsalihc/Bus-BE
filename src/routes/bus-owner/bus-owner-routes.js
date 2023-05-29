const { Router } = require("express");
const { accessPermission } = require("../../utils/token-handler");
const { Role } = require("../../constants/variables");
const { register, login, profileDetails, BusComplaints, BusRegistration } = require("../../controllers/bus-owner/bus-owner-controller");
const router = Router();
router.post('/register',(req,res)=>register(req,res))
router.post('/login',(req,res)=>login(req,res))
router.post('/bus-registration',accessPermission([Role.BUS_OWNER]),(req,res)=>BusRegistration(req,res))
router.get('/bus-complaints',accessPermission([Role.BUS_OWNER]),(req,res)=>BusComplaints(req,res))
router.get('/profile-detail',accessPermission([Role.BUS_OWNER]),(req,res)=>profileDetails(req,res))


module.exports = router;
