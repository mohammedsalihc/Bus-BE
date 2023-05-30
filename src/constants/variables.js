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
    internal_server:"internal server error",
    bus_type_already_exist:"bus_type already exist",
    location_exist:"location already exist"
  };
  
  const Role = {
    ADMIN: 'admin',
    USER: 'user',
    BUS_OWNER: 'bus-owner'
  };

  module.exports = {
    errorMessage,
    CommonErrorMessage,
    Role,
  };
  