const errorMessage = {
    400: "Bad request",
    404: "Not found",
    500: "Internal server error",
    401: "Unauthorized",
    403: "Forbidden",
    405: "Method not allowed",
    409: "Conflict request"
  };
  
  const CommonErrorMessage = {
    required_fields: "Please fill in all required fields",
    user_not_found: "User not found",
    user_already_exist: "User already exists",
    incorrect_password: "Incorrect password",
    owner_already_exist: "Bus owner already exists",
    owner_not_found: "Bus owner not found",
    invalid_bus_type: "Invalid bus type",
    bus_not_found: "Bus not found",
    internal_server:"internal server error"
  };
  
  const Role = {
    ADMIN: 'admin',
    USER: 'user',
    BUS_OWNER: 'bus-owner'
  };

  const BusType = {
    ORDINARY: "Ordinary",
    LIMITED_STOP_ORDINARY: "Limited_stop_Ordinary",
    TOWN_TO_TOWN_ORDINARY: "Town_to_Town_Ordinary",
    FAST_PASSENGER: "Fast_Passenger",
    LIMITED_STOP_FAST_PASSENGER: "Limited_stop_fast_Passenger",
    POINT_TO_POINT: "Point_to_Point",
    SUPER_FAST: "Super_Fast",
    SUPER_EXTREME: "SUPER_Extreme",
    SUPER_DELUXE: "Super_Deluxe",
    GARUDA_KING_CLASS: "Garuda_King_Class",
    LOW_FLOOR_AC_VOLVO: "Low_Floor_Ac_Volvo",
    SILVER_LINE_JET: "SILVER_LINE_JET"
};
  
  module.exports = {
    errorMessage,
    CommonErrorMessage,
    Role,
    BusType
  };
  