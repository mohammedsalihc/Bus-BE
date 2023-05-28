import { Router } from "express";
import { AdminController } from "../../controllers/admin/admin-controller";
import { JwtHandler } from "../../utilities/tokenHandler";
import { Role } from "../../constants/enums/role-enum";

const router=Router()
const admin = new AdminController()
const jwtHandler= new JwtHandler()
router.post('/login',(req,res)=>admin.login(req,res))
router.put('/approve-bus/:id',jwtHandler.accessPermission([Role.ADMIN]),(req,res)=>admin.approveBus(req,res))
router.get('/list-complaints',jwtHandler.accessPermission([Role.ADMIN]),(req,res)=>admin.listAllComplaints(req,res))
router.get('/list-buses',jwtHandler.accessPermission([Role.ADMIN]),(req,res)=>admin.listAllBuses(req,res))
export default router