import { request } from "http";
import {
  ExpressRequest,
  ExpressResponse,
  IAdmin,
  IBus,
  IToken,
} from "../../constants/interfaces/interface";
import { ControllerHandler } from "../../utilities/controller-handlers";
import { Role } from "../../constants/enums/role-enum";
import { AdminSerivice } from "../../services/admin/admin-service";
import { BcryptHandler } from "../../utilities/bcryptHandler";
import { CommonErroMessages } from "../../constants/variables/constants";
import { JwtHandler } from "../../utilities/tokenHandler";

export class AdminController extends ControllerHandler {
  private adminService = new AdminSerivice();
  private bcryptHandler = new BcryptHandler();
  private jwtHandler = new JwtHandler();

  login = async (request: ExpressRequest, response: ExpressResponse) => {
    try {
      let body: IAdmin = request.body;
      if (!body?.email || !body?.password) {
        return this.error(response, 400, CommonErroMessages.required_fields);
      }
      body.email = body?.email.toLowerCase();
      let admin = await this.adminService.getAdmin(body?.email);
      if (!admin) {
        return this.error(response, 401, CommonErroMessages.user_not_found);
      }
      const validateAdmin = await this.bcryptHandler.verifyPassword(
        admin?.password as any,
        body?.password
      );
      if (!validateAdmin) {
        return this.error(response, 401, CommonErroMessages.incorrect_password);
      }
      const token: IToken = await this.jwtHandler.createToken(admin);
      this.jsonResponse<IToken>(response, token);
    } catch (e) {
      this.error(response, 500, undefined, e);
    }
  };

  approveBus = async (request: ExpressRequest, response: ExpressResponse) => {
    try {
      const busId = request.params.id;
      const approveBus = await this.adminService.ApproveBus(busId, { approved: true })
      this.jsonResponse<IBus>(response,approveBus)
    } catch (e) {
      this.error(response, 500, undefined, e)
    }
  }

}
