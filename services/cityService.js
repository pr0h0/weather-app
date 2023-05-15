const { city } = require("../models");

const getAllCities = () => city.findAll({});
const getCityById = (id) => city.findOne({ where: { id } });
const getCityByName = (name) => city.findOne({ where: { name } });
const getCityByQuery = (query) => city.findOne({ where: { query } });
const createCity = (data) => city.create(data);

module.exports = {
  getAllCities,
  getCityById,
  getCityByName,
  getCityByQuery,
  createCity,
};
