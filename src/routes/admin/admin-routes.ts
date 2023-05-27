import { Router } from "express";
import { AdminController } from "../../controllers/admin/admin-controller";

const router=Router()
const admin = new AdminController()
router.post('/login',(req,res)=>admin.login(req,res))



export default router