const { BusType, CommonErrorMessage, Role } = require("../../constants/variables");
const { getOwner, createOwner, createBusService, findBusForOwner, collectComplaints, getOwnerById } = require("../../services/bus-owner/bus-owner-service");
const { getPasswordHash, verifyPassword } = require("../../utils/bcrypt");
const { dateToUtc } = require("../../utils/moment-handler");
const generateRandomCode = require("../../utils/randomcode");
const { createToken } = require("../../utils/token-handler");

const busOwnerController = {
    register: async (request, response) => {
        try {
            let body = request.body;
            if (!body?.email || !body?.password || !body?.name) {
                return response.status(400).json({ msg: CommonErrorMessage.required_fields, status: false });
            }
            body.email = body.email.toLowerCase();
            if (await getOwner(body?.email)) {
                return response.status(400).json({ msg: CommonErrorMessage.user_already_exist, status: false });
            }
            body.password = await getPasswordHash(body?.password);
            let create_owner = {
                email: body?.email,
                name: body?.name,
                role: Role.BUS_OWNER,
                password: body?.password,
            };
            const owner = await createOwner(create_owner);
            const token = await createToken(owner);
            response.status(200).json({ status: true, token });
        } catch (e) {
            console.log(e)
            response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false });
        }
    },

    login: async (request, response) => {
        try {
            let body = request.body;
            if (!body?.email || !body.password) {
                return response.status(400).json({ msg: CommonErrorMessage.required_fields, status: false });
            }
            body.email = body.email?.toLowerCase();
            let owner = await getOwner(body?.email);
            if (!owner) {
                return response.status(400).json({ msg: CommonErrorMessage.owner_not_found, status: false });
            }
            const validate_owner = await verifyPassword(owner?.password, body?.password);
            if (!validate_owner) {
                return response.status(400).json({ msg: CommonErrorMessage.incorrect_password, status: false });
            }
            const token = await createToken(owner);
            response.status(200).json({ status: true, token });
        } catch (e) {
            response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false });
        }
    },

    BusRegistration: async (request, response) => {
        try {
            let body = request.body;
            const userId = request.payload?.user;
            const bus_types = [
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
            ];
            if (!body?.name ||
                !body?.bus_type ||
                !body?.location ||
                !body?.route_from ||
                !body?.route_to ||
                !body?.starting_time ||
                !body?.ending_time
            ) {
                return response.status(400).json({ msg: CommonErrorMessage.required_fields, status: false });
            }
            if (!bus_types.includes(body?.bus_type)) {
                return response.status(400).json({ msg: CommonErrorMessage.invalid_bus_type, status: false });
            }

            let create_bus_service = {
                name: body?.name,
                bus_type: body?.bus_type,
                location: body?.location,
                route_from: body?.route_from,
                route_to: body?.route_to,
                wifi: body?.wifi,
                air_condition: body?.air_condition,
                starting_time: dateToUtc(body?.starting_time),
                ending_time: dateToUtc(body.ending_time),
                bus_code: generateRandomCode(4),
                bus_owner: userId
            };

            const bus_service = await createBusService(create_bus_service);
            response.status(200).json({ status: true, bus_service });
        } catch (e) {
            console.log(e)
            response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false });
        }
    },

    BusComplaints: async (request, response) => {
        try {
            let userId = request.payload.user;
            let my_buses = await findBusForOwner(userId);
            if (!my_buses) {
                return response.status(400).json({ msg: CommonErrorMessage.bus_not_found, status: false });
            }
            let busIds = my_buses.map((bus) => bus._id);
            let complaints = await collectComplaints(busIds);
            response.status(200).json({ status: true, complaints });
        } catch (e) {
            response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false });
        }
    },

    profileDetails: async (request, response) => {
        try {
            let userId = request.payload.user;
            const bus_owner = await getOwnerById(userId);
            if (!bus_owner) {
                return response.status(400).json({ msg: CommonErrorMessage.owner_not_found, status: false });
            }
            response.status(200).json({ status: true, bus_owner });
        } catch (e) {
            console.log(e)
            response.status(500).json({ msg:CommonErrorMessage.internal_server, status: false });
        }
    }
};

module.exports = busOwnerController;
