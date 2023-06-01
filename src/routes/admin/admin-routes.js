const { Router } = require("express");
const router = Router();
const { login, approveBus, listAllBuses, listAllComplaints, addLocation,createBusTypes, profileDetail, listBusForApprove } = require("../../controllers/admin/admin-controller");
const { accessPermission } = require('../../utils/token-handler');
const { Role } = require("../../constants/variables");

router.post('/login', (req, res)=> login(req, res));

router.put('/approve-bus/:id', accessPermission([Role.ADMIN]),(req,res)=> approveBus(req, res))

router.get('/list-complaints', accessPermission([Role.ADMIN]),(req,res)=> listAllComplaints(req, res))

router.get('/list-buses', accessPermission([Role.ADMIN]),(req,res)=> listAllBuses(req, res))

router.post('/add-location',accessPermission([Role.ADMIN]),(req,res)=>addLocation(req,res))

router.post('/add-bus-type',accessPermission([Role.ADMIN]),(req,res)=>createBusTypes(req,res))

router.get('/profile-detail',accessPermission([Role.ADMIN]),(req,res)=>profileDetail(req,res))

router.get('/list-unapproved-buses',accessPermission([Role.ADMIN]),(req,res)=>listBusForApprove(req,res))

module.exports = router;
