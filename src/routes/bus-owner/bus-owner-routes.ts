import { Router } from "express";
import { BusOwnerController } from "../../controllers/Bus-owner/bus-owner-controller";

const router=Router()
const bus_owner = new BusOwnerController()
router.post('/register',(req,res)=>bus_owner.register(req,res))
router.post('/login',(req,res)=>bus_owner.login(req,res))



export default router