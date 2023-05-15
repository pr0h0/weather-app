const passport = require("passport");
const bcrypt = require("bcryptjs");
const userService = require("../../services/userService");
const { jsonSuccess, jsonError } = require("../../utils/responseUtils");

module.exports = {
  loginPage: (req, res) => {
    res.render("login");
  },
  registerPage: (req, res) => {
    res.render("register");
  },
  auth: passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  login: async (req, res) => {
    const user = await userService.getUserById(req.user.id);

    jsonSuccess(res, { data: user, msg: "User logged in" });
  },
  register: async (req, res) => {
    const { email, password } = req.body;

    const emailNormalized = email.toString().toLowerCase().trim();

    if (!emailNormalized || !password) {
      jsonError(res, {
        msg: "All fields are required",
      });
      return;
    }

    const existingUser = await userService.getUserByEmail(emailNormalized);

    if (existingUser) {
      jsonError(res, { msg: "Email alredy taken" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await userService.createUser({
      email: emailNormalized,
      password: hash,
      isAdmin: 0,
      isPublisher: 1,
    });

    jsonSuccess(res, { msg: "User registered" });
  },
  logout: (req, res) => {
    req.logout(console.log);
    jsonSuccess(res, { msg: "User logged out" });
  },
};
