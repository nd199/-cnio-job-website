const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(
    {
      id: payload._id,
      role: payload.role,
    },
    process.env.TOKEN_ID,
    { expiresIn: '1d' }
  );
};

module.exports = { generateToken };
