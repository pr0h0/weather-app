let express = require("express");
let router = express.Router();
let loginController = require("../controllers/login");

router.get("/login", loginController.loginPage);
router.post("/login", loginController.auth, loginController.login);

router.get("/register", loginController.registerPage);
router.post("/register", loginController.register);

router.all("/logout", loginController.logout);

module.exports = router;
