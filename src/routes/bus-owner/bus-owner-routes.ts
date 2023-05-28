import { Router } from "express";
import { BusOwnerController } from "../../controllers/Bus-owner/bus-owner-controller";
import { JwtHandler } from "../../utilities/tokenHandler";
import { Role } from "../../constants/enums/role-enum";

const router=Router()
const bus_owner = new BusOwnerController()
const jwtHandler= new JwtHandler()
router.post('/register',(req,res)=>bus_owner.register(req,res))
router.post('/login',(req,res)=>bus_owner.login(req,res))
router.post('/bus-registration',jwtHandler.accessPermission([Role.BUS_OWNER]),(req,res)=>bus_owner.BusRegistration(req,res))
router.get('/bus-complaints',jwtHandler.accessPermission([Role.BUS_OWNER]),(req,res)=>bus_owner.BusComplaints(req,res))
router.get('/profile-detail',jwtHandler.accessPermission([Role.BUS_OWNER]),(req,res)=>bus_owner.profileDetails(req,res))

export default router