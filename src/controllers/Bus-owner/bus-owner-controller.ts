import { Role } from "../../constants/enums/role-enum";
import {
    ExpressRequest,
    ExpressResponse,
    IBusOwner,
    IToken,
} from "../../constants/interfaces/interface";
import { CommonErroMessages } from "../../constants/variables/constants";
import { BusOwnerService } from "../../services/bus-owner/bus-owner-service";
import { BcryptHandler } from "../../utilities/bcryptHandler";
import { ControllerHandler } from "../../utilities/controller-handlers";
import { JwtHandler } from "../../utilities/tokenHandler";

export class BusOwnerController extends ControllerHandler {
    private BusOwnerSerivce = new BusOwnerService();
    private bcrypt = new BcryptHandler();
    private jwtHandler = new JwtHandler();

    register = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            let body: IBusOwner = request.body;
            if (!body?.email || !body?.password || !body?.name) {
                return this.error(response, 400, CommonErroMessages.required_fields);
            }
            body.email = body.email.toLowerCase();
            if (await this.BusOwnerSerivce.getOwner(body?.email)) {
                return this.error(
                    response,
                    400,
                    CommonErroMessages.owner_already_exist
                );
            }
            body.password = await this.bcrypt.getPasswordHash(body?.password);
            let create_owner: IBusOwner = {
                email: body?.email,
                name: body?.name,
                role: Role.BUS_OWNER,
                password: body?.password,
            };
            const owner = await this.BusOwnerSerivce.createOwner(create_owner);
            const token: IToken = await this.jwtHandler.createToken(owner);
            this.jsonResponse<IToken>(response, token);
        } catch (e) {
            this.error(response, 500, undefined, e);
        }
    };

    login = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            let body: IBusOwner = request.body;
            if (!body?.email || !body.password) {
                return this.error(response, 400, CommonErroMessages.required_fields)
            }
            body.email = body.email?.toLowerCase()
            let owner = await this.BusOwnerSerivce.getOwner(body?.email)
            if (!owner) {
                return this.error(response, 401, CommonErroMessages.owner_not_found)
            }
            const validate_owner = await this.bcrypt.verifyPassword(owner?.password as any, body?.password)
            if (!validate_owner) {
                return this.error(response, 401, CommonErroMessages.incorrect_password)
            }
            const token: IToken = await this.jwtHandler.createToken(owner)
            this.jsonResponse<IToken>(response, token)
        } catch (e) {

        }
    }
}
