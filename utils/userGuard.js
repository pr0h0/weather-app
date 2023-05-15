const { jsonError } = require("./responseUtils");

module.exports = function userGuard(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    jsonError(res, {
      status: 401,
      msg: "User is not logged in",
    });
  }
};
