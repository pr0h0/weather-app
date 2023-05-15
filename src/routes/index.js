let express = require("express");
let router = express.Router();
let Controller = require("../controllers/index.js");
let apiController = require("../controllers/api.js");

router.all("/api/*", apiController.notFound);
router.all("*", Controller.index);

module.exports = router;
