import { BusType } from "../../constants/enums/bus-type-enum";
import { Role } from "../../constants/enums/role-enum";
import {
    ExpressRequest,
    ExpressResponse,
    IBus,
    IBusOwner,
    IToken,
} from "../../constants/interfaces/interface";
import { CommonErroMessages } from "../../constants/variables/constants";
import { BusOwnerService } from "../../services/bus-owner/bus-owner-service";
import { BcryptHandler } from "../../utilities/bcryptHandler";
import { ControllerHandler } from "../../utilities/controller-handlers";
import { dateToUtc } from "../../utilities/moment-handler";
import { generateRandomCode } from "../../utilities/random-code";
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
            this.error(response, 500, undefined, e)
        }
    }

    BusRegistration = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            let body: IBus = request.body;
            const userId=request.payload?.user
            const bus_types=[
                BusType.ORDINARY,
                BusType.LIMITED_STOP_ORDINARY,
                BusType.TOWN_TO_TOWN_ORDINARY,
                BusType.FAST_PASSENGER,
                BusType.LIMITED_STOP_FAST_PASSENGER,
                BusType.POINT_TO_POINT,
                BusType.POINT_TO_POINT,
                BusType.SUPER_FAST,
                BusType.SUPER_EXTREME,
                BusType.SUPER_DELUXE,
                BusType.GARUDA_KING_CLASS,
                BusType.LOW_FLOOR_AC_VOLVO,
                BusType.SILVER_LINE_JET
            ]
            if (!body?.name ||
                !body?.bus_type ||
                !body?.location ||
                !body?.route_from ||
                !body?.route_to ||
                !body?.starting_time ||
                !body?.ending_time 
                ){
                return this.error(response, 400, CommonErroMessages.required_fields)
            }
            if(!bus_types.includes(body?.bus_type)){
                return this.error(response,400,CommonErroMessages.invalid_bus_type)
            }

           let create_bus_service:IBus={
             name:body?.name,
             bus_type:body?.bus_type,
             location:body?.location,
             route_from:body?.route_from,
             route_to:body?.route_to,
             wifi:body?.wifi,
             air_condition:body?.air_condition,
             starting_time:dateToUtc(body?.starting_time),
             ending_time:dateToUtc(body.ending_time),
             bus_code:generateRandomCode(4),
             bus_owner:userId
           }

           const bus_service=await this.BusOwnerSerivce.createBusService(create_bus_service)
           console.log(bus_service)
           this.jsonResponse<IBus>(response,bus_service)
        } catch (e) {
            this.error(response, 500, undefined, e)
        }


    }
}
