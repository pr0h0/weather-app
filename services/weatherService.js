const cityService = require("./cityService");
const cacheService = require("./cacheService");

const sendRequest = require("../utils/sendRequest");

require("dotenv").config();

const API_KEY = process.env.WEATHER_API_KEY;
const BASE = "http://api.openweathermap.org";

const getCityData = async (city, lat, lon) => {
  if ((!lat || !lon) && city) {
    return await decodeCityToLatLon(city);
  } else if (lat && lon) {
    return { lat, lon };
  }
  return null;
};

// https://openweathermap.org/api/geocoding-api
const decodeCityToLatLon = async (query, limit = 1) => {
  const city = await cityService.getCityByQuery(query);

  if (city) {
    // City found in db and we don't need to call api
    return city.get();
  }

  const url = `${BASE}/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_KEY}`;

  const data = await sendRequest(url);

  if (data && data.length > 0) {
    // Saving city(ies) to db
    data.forEach(async (city) => {
      await cityService.createCity({
        query: query.trim().toLowerCase(),
        ...city,
      });
    });
    return data[0];
  }
  // City not found
  return null;
};

// https://openweathermap.org/current
const getCurrentWeather = async ({ city, lat, lon }) => {
  const cityData = await getCityData(city, lat, lon);
  if (!cityData) return { error: true, msg: "City not found" };

  // Check if we have cached data for this city
  const cachedData = await cacheService.getCacheValue(
    `current-${cityData.lat}+${cityData.lon}`
  );
  if (cachedData) return cachedData;

  const URL = `${BASE}/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${API_KEY}&units=metric`;

  const data = await sendRequest(URL);

  if (data && data.code === 200) {
    // Saving city(ies) to cache for 5 minutes
    cacheService.setCacheValue(
      `current-${cityData.lat}+${cityData.lon}`,
      data,
      5 * 60 * 1000
    );
  }

  return data;
};

// https://openweathermap.org/forecast5
const getForecastWeather = async ({ city, lat, lon, count }) => {
  const cityData = await getCityData(city, lat, lon);
  if (!cityData) return { msg: "City not found", status: 404 };

  // Check if we have cached data for this city
  const cachedData = await cacheService.getCacheValue(
    `forecast-${cityData.lat}+${cityData.lon}`
  );
  if (cachedData) return cachedData;

  const URL = `${BASE}/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&cnt=${count}&appid=${API_KEY}&units=metric`;
  const data = await sendRequest(URL);

  if (data && data.cod === 200) {
    // Saving city(ies) to cache for 1h
    cacheService.setCacheValue(
      `forecast-${cityData.lat}+${cityData.lon}`,
      data,
      60 * 60 * 1000
    );
  }

  return data;
};

// https://openweathermap.org/history
const getHistoryWeather = async ({ city, from, to, lat, lon }) => {
  const cityData = await getCityData(city, lat, lon);
  if (!cityData) return { error: true, msg: "City not found", status: 404 };

  const start = new Date(from).getTime() / 1000;
  const end = new Date(to).getTime() / 1000;

  // Check if we have cached data for this city
  const cachedData = await cacheService.getCacheValue(
    `history-${cityData.lat}+${cityData.lon}-${start}+${end}`
  );
  if (cachedData) return cachedData;

  const URL = `https://history.openweathermap.org/data/2.5/history/city?lat=${cityData.lat}&lon=${cityData.lon}&type=hour&start=${start}&end=${end}&appid=${API_KEY}`;
  const data = await sendRequest(URL);

  if (data && data.cod === 200) {
    // Saving city(ies) to cache for 1d
    cacheService.setCacheValue(
      `history-${cityData.lat}+${cityData.lon}-${start}+${end}`,
      data,
      24 * 60 * 60 * 1000
    );
  }

  return data;
};

module.exports = {
  decodeCityToLatLon,
  getCurrentWeather,
  getForecastWeather,
  getHistoryWeather,
};
