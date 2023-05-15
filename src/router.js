module.exports = [
  {
    path: "/weather",
    handler: require("./routes/weather"),
    comment: "Routes related to API endpoints for fetching data",
  },
  {
    path: "/api",
    handler: require("./routes/login"),
    comment: "Routes related to API endpoints for login and register",
  },
  {
    path: "/",
    handler: require("./routes/index"),
    comment: "Routes related to mvc routes for rendering views",
  },
];
