const { Router } = require("express");
const router = Router();
const { login, approveBus, listAllBuses, listAllComplaints } = require("../../controllers/admin/admin-controller");
const { accessPermission } = require('../../utils/token-handler');
const { Role } = require("../../constants/variables");

router.post('/login', (req, res)=> login(req, res));

router.put('/approve-bus/:id', accessPermission([Role.ADMIN]),(req,res)=> approveBus(req, res))

router.get('/list-complaints', accessPermission([Role.ADMIN]),(req,res)=> listAllComplaints(req, res))

router.get('/list-buses', accessPermission([Role.ADMIN]),(req,res)=> listAllBuses(req, res))

module.exports = router;
