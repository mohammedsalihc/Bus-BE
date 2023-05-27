import { Router } from "express";
import { UserController } from "../../controllers/user/user-controller";
import { JwtHandler } from "../../utilities/tokenHandler";
import { Role } from "../../constants/enums/role-enum";

const router=Router()
const user = new UserController()
const jwtHandler= new JwtHandler()

router.post('/register',(req,res)=>user.register(req,res))
router.post('/login',(req,res)=>user.Login(req,res))
router.get('/list-bus',jwtHandler.accessPermission([Role.USER]),(req,res)=>user.ListBus(req,res))
router.post('/create-complaint',jwtHandler.accessPermission([Role.USER]),(req,res)=>user.createComplaint(req,res))


export default router