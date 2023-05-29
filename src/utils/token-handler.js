const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { errorMessage } = require('../constants/variables');



dotenv.config();

const accessToken = async (user, email, role) => {
  let payload = {
    user,
    email,
    role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};

const createToken = async (user) => {
  const token = await accessToken(user._id, user.email, user.role);
  return { token };
};

const accessPermission = (roles) => {
  return (req, res, next) => {
    const token = req.headers['Authorization'] || req.headers['authorization'];
    if (!token) {
      return res.status(401).send(errorMessage[401]);
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send(errorMessage[401]);
        } else {
          const payload = decoded;
          req.payload = payload;
          if (!roles || !roles.length || roles.includes(payload.role)) {
            next();
          } else {
            return res.status(401).send(errorMessage[401]);
          }
        }
      });
    }
  };
};

module.exports = {
    createToken,
    accessPermission,
  };
