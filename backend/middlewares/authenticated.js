const { verify } = require("../helpers/token");
const User = require("../models/User");

const authenticated = async (req, res, next) => {
  const tokenData = verify(req.cookies.token);

  const user = await User.findOne({ _id: tokenData.id });

  if (!user) {
    res.send({ error: "Authenticated user not found" });
    return;
    // throw new Error("user not found!");
  }
  // console.log("AUTHHHHCITADER", user);

  req.user = user;
  next();
};

module.exports = { authenticated };
