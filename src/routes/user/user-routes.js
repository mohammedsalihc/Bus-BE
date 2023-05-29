const { Router } = require("express");
const { register, login, listBus, createComplaint, profileDetail, listLocation } = require("../../controllers/user/user-controller");
const { accessPermission } = require("../../utils/token-handler");
const { Role } = require("../../constants/variables");
const router = Router();

router.post('/register', (req, res) => register(req, res))

router.post('/login', (req, res) => login(req, res))

router.get('/list-bus', accessPermission([Role.USER]), (req, res) => listBus(req, res))

router.post('/create-complaint', accessPermission([Role.USER]), (req, res) => createComplaint(req, res))

router.get('/profile-detail', accessPermission([Role.USER]), (req, res) => profileDetail(req, res))

router.get('/list-location',accessPermission([Role.USER]),(req,res)=>listLocation(req,res))

module.exports = router;
