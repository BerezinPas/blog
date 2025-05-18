const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const generate = (data) => {
  return jwt.sign(data, SECRET, { expiresIn: "30d" });
};

const verify = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { generate, verify };
