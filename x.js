require("dotenv").config();
const weatherService = require("./services/weatherService");

const getCityData = async () => {
  return weatherService
    .decodeCityToLatLon("sarajevo")
    .then((res) => console.dir({ type: "CityData", res }, { depth: null }));
};

const getCurrentWeather = async () => {
  // localhost:port/weather/current?city=sarajevo
  return weatherService.getCurrentWeather({ city: "Sarajevo" }).then((res) => {
    console.dir({ type: "CurrentWeather", res }, { depth: null });
  });
};

const getForecastWeather = async () => {
  // localhost:port/weather/forecast?city=sarajevo&count=10
  return weatherService
    .getForecastWeather({ city: "Sarajevo", count: 10 })
    .then((res) => {
      console.dir({ type: "ForecastWeather", res }, { depth: null });
    });
};

const getHistoryWeather = async () => {
  // localhost:port/weather/history?city=sarajevo&from=2023-05-01&to=2023-05-07
  return weatherService
    .getHistoryWeather({
      city: "Sarajevo",
      from: "2023-05-01",
      to: "2023-05-07",
    })
    .then((res) => {
      console.dir({ type: "HistoryWeather", res }, { depth: null });
    });
};

const getWeather = async () => {
  await getCityData();
  await getCurrentWeather();
  await getForecastWeather();
  await getHistoryWeather();
};

getWeather();
