const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");
const userService = require("../services/userService.js");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//#region Standard login
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, next) => {
      let user = await userService.getUserByEmail(email);

      if (user) {
        let isMatch = await bcryptjs.compare(password, user.password);
        if (isMatch) {
          next(null, user);
          return;
        }
      }
      next(null, false, { message: "Invalid username or password" });
    }
  )
);
//#endregion
