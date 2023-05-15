const { user } = require("../models");

const getUserByEmail = (email) => user.findOne({ where: { email } });
const getUserById = (id) => user.findOne({ where: { id } });
const createUser = (data) => user.create(data);

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
};
