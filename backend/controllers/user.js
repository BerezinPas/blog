const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");
const ROLES = require("../constants/role");

// register
const register = async (login, password) => {
  if (!password) {
    throw new Error("Pass is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });
  const token = generate({ id: user.id });

  return { user, token };
};

// login

const login = async (login, password) => {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("User is not existed");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Wrong password");
  }

  const token = generate({ id: user.id });

  return { token, user };
};

const getUsers = () => {
  return User.find({});
};

const getRoles = () => {
  return [
    { id: ROLES.ADMIN, name: "Admin" },
    { id: ROLES.MODERATOR, name: "Moderator" },
    { id: ROLES.USER, name: "User" },
  ];
};

// delete

const deleteUser = (id) => {
  return User.deleteOne({ _id: id });
};

// edt ROLE

const updateUser = (id, userData) => {
  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" });
};

module.exports = {
  register,
  login,
  deleteUser,
  updateUser,
  getUsers,
  getRoles,
};
