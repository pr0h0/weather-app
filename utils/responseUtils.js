/**
 * @param {Response} res response object from express
 * @param {{msg?: string, data?: object, status?: number}} responseBody
 */
const jsonSuccess = (
  res,
  { msg = "Success", data = null, status = 200 } = {}
) => {
  res.status = status;
  return res.json({
    error: false,
    data,
    msg,
  });
};

/**
 *
 * @param {Response} res response object from express
 * @param {{msg?: string, data?: object, status?:number}} responseBody
 */
const jsonError = (
  res,
  { msg = "Something went wrong", status = 400, data = null } = {}
) => {
  res.status(status);
  return res.json({
    error: true,
    data,
    msg,
  });
};

module.exports = {
  jsonSuccess,
  jsonError,
};
