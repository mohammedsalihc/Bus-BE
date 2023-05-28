import { Role } from "../../constants/enums/role-enum";
import {
  ExpressRequest,
  ExpressResponse,
  IBus,
  IComplaint,
  IToken,
  IUser,
} from "../../constants/interfaces/interface";
import { CommonErroMessages } from "../../constants/variables/constants";
import { userService } from "../../services/user/user-service"; 
import { BcryptHandler } from "../../utilities/bcryptHandler"; 
import { ControllerHandler } from "../../utilities/controller-handlers"; 
import { dateToUtc, getCurrentDateandTime } from "../../utilities/moment-handler";
import { JwtHandler } from "../../utilities/tokenHandler";

export class UserController extends ControllerHandler {
  private userService = new userService();
  private bcrypt = new BcryptHandler();
  private jwtHandler = new JwtHandler();

  register = async (request: ExpressRequest, response: ExpressResponse) => {
    try {
      let body: IUser = request.body;
      if (!body?.email || !body?.password || !body.name) {
        return this.error(response, 400, CommonErroMessages.required_fields);
      }
      body.email = body.email.toLowerCase();
      if (await this.userService.userByEmail(body?.email)) {
        return this.error(response, 400, CommonErroMessages.user_already_exist);
      }
      body.password = await this.bcrypt.getPasswordHash(body?.password);
      let create_user: IUser = {
        email: body?.email,
        name: body?.name,
        role: Role.USER,
        password: body?.password,
      };
      const user = await this.userService.createUser(create_user);
      const token: IToken = await this.jwtHandler.createToken(user);
      this.jsonResponse<IToken>(response,token);
    } catch (e) {
      this.error(response, 500, undefined, e);
    }
  }

  Login=async(request:ExpressRequest,response:ExpressResponse)=>{
    try{
        let body:IUser=request.body;
        if(!body?.email||!body?.password){
          return this.error(response,400,CommonErroMessages.required_fields)
        }
        body.email=body.email?.toLowerCase()
        let user=await this.userService.userByEmail(body?.email)
        if(!user){
          return this.error(response,401,CommonErroMessages.user_not_found)
        }
        const validate_user=await this.bcrypt.verifyPassword(user?.password as any,body?.password)
        if(!validate_user){
          return this.error(response,401,CommonErroMessages.incorrect_password)
        }
        const token:IToken=await this.jwtHandler.createToken(user)
        this.jsonResponse<IToken>(response,token)
    }catch(e){
        this.error(response,500,undefined,e)
    }
  }


  ListBus=async(request:ExpressRequest,response:ExpressResponse)=>{
    try{
      const location=request.query.location;
      const from=request.query.from;
      const to=request.query.to
      const bus_type=request.query.bus_type;
      const buses=await this.userService.listBuses(location as string,from as string,to as string,bus_type as string)
      this.jsonResponse<IBus[]>(response,buses)
    }catch(e){
      this.error(response,500,undefined,e)
    }
  }

  createComplaint=async(request:ExpressRequest,response:ExpressResponse)=>{
    try{
      let body:IComplaint=request.body;
      let userId=request.payload?.user
      console.log('Hello')
      if(!body?.bus||!body?.problem){
        return this.error(response,400,CommonErroMessages.required_fields)
      }
      let bus=await this.userService.getbus(body?.bus as string)
      if(!bus){
        return this.error(response,400,CommonErroMessages.bus_not_found)
      }
      let create_complaint:IComplaint={
        problem:body?.problem,
        comment:body?.comment,
        created:dateToUtc(getCurrentDateandTime()),
        bus:bus?._id,
        user:userId as string
      }
      let complaint=await this.userService.createComplaint(create_complaint)
      this.jsonResponse<IComplaint>(response,complaint)
    }catch(e){
      this.error(response,500,undefined,e)
    }
  }

  profileDetail=async(request:ExpressRequest,response:ExpressResponse)=>{
    try{
       let user_id=request.payload.user;
       const user=await this.userService.getUserBYid(user_id as string)
       if(!user){
        return this.error(response,401,CommonErroMessages.user_not_found)
       }
       this.jsonResponse<IUser>(response,user)
    }catch(e){
      return this.error(response,500,undefined,e)
    }
  }

}
