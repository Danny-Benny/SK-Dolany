const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { findByUsername } = require("../models/User");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await findByUsername(username);
      if (!user) return done(null, false);

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
