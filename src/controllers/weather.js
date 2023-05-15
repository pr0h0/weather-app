const weatherService = require("../../services/weatherService");
const { jsonSuccess, jsonError } = require("../../utils/responseUtils");

module.exports = {
  current: async (req, res) => {
    const { city, lat, lon } = req.query;

    try {
      const data = await weatherService.getCurrentWeather({ city, lat, lon });
      if (data.error || (data.cod && Number(data.cod) !== 200)) {
        return jsonError(res, {
          msg: data.message || data.msg,
          status: data.cod || 404,
        });
      }
      jsonSuccess(res, { data });
    } catch (error) {
      console.log(error);
      jsonError(res, { msg: error.message, status: 400 });
    }
  },
  forecast: async (req, res) => {
    const { city, count = 10, lat, lon } = req.query;

    try {
      const data = await weatherService.getForecastWeather({
        city,
        count,
        lat,
        lon,
      });
      if (data.error || (data.cod && Number(data.cod) !== 200)) {
        return jsonError(res, {
          msg: data.message || data.msg,
          status: data.cod || 404,
        });
      }
      jsonSuccess(res, { data });
    } catch (error) {
      console.log(error);
      jsonError(res, { msg: error, status: 400 });
    }
  },
  history: async (req, res) => {
    const { city, from, to, lat, lon } = req.query;

    try {
      const data = await weatherService.getHistoryWeather({
        city,
        from,
        to,
        lat,
        lon,
      });
      if (data.error || (data.cod && Number(data.cod) !== 200)) {
        console.log({ data });
        return jsonError(res, {
          msg: data.message || data.msg,
          status: data.cod || 404,
        });
      }
      jsonSuccess(res, { data });
    } catch (error) {
      console.log(error);
      jsonError(res, { msg: error, status: 400 });
    }
  },
};
