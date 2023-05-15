const { jsonError } = require("../../utils/responseUtils");

module.exports = {
  notFound: (req, res) => {
    return jsonError(res, {
      status: 404,
      msg: "Not found",
    });
  },
};
