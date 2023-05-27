import { Role } from "../../constants/enums/role-enum";
import {
  ExpressRequest,
  ExpressResponse,
  IToken,
  IUser,
} from "../../constants/interfaces/interface";
import { CommonErroMessages } from "../../constants/variables/constants";
import { userService } from "../../services/user/user-service"; 
import { BcryptHandler } from "../../utilities/bcryptHandler"; 
import { ControllerHandler } from "../../utilities/controller-handlers"; 
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
        const validate_user=await this.bcrypt.verifyPassword(user?.password as string,body?.password)
        if(!validate_user){
          return this.error(response,401,CommonErroMessages.incorrect_password)
        }
        const token:IToken=await this.jwtHandler.createToken(user)
        this.jsonResponse<IToken>(response,token)
    }catch(e){
        this.error(response,500,undefined,e)
    }
  }


}
