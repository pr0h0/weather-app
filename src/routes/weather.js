let express = require("express");
let router = express.Router();
let wearherController = require("../controllers/weather");
const userGuard = require("../../utils/userGuard");

router.get("/current", userGuard, wearherController.current);
router.get("/forecast", userGuard, wearherController.forecast);
router.get("/history", userGuard, wearherController.history);

module.exports = router;
