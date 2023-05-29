const bcrypt = require('bcrypt');

const saltrounds = 10;

const bcryptHandler = {
  getPasswordHash: async (password) => {
    return await bcrypt.hash(password, saltrounds);
  },

  verifyPassword: async (hash, password) => {
    return await bcrypt.compare(password, hash);
  }
};

module.exports = bcryptHandler;
