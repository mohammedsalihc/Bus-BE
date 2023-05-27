import { Router } from "express";
import { UserController } from "../../controllers/user/user-controller";

const router=Router()
const user = new UserController()

router.post('/register',(req,res)=>user.register(req,res))
router.post('/login',(req,res)=>user.Login(req,res))



export default router