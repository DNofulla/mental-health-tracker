const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
  console.log("SERIALIZE USER");

  return done(null, user);
});

passport.deserializeUser(async (username, done) => {
  console.log("DESERIALIZE USER");
  try {
    const user = await User.findOne({
      username: username.toLowerCase(),
    });

    if (!user) {
      return done({ message: "No account with this username exists!" }, false);
    }

    return done(null, {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      phoneNumber: user.phoneNumber,
      verified: user.verified,
      joinedAt: user.joinedAt,
    });
  } catch (message) {
    return done({ message: "No account with this username exists!" }, false);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("Login");
    try {
      const user = await User.findOne({ username: username.toLowerCase() });

      if (!user) {
        return done(
          { message: "No account with this username exists!" },
          false,
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done({ message: "Invalid Password!" }, false);
      }

      return done(null, {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        phoneNumber: user.phoneNumber,
        verified: user.verified,
        joinedAt: user.joinedAt,
      });
    } catch (message) {
      console.log(message);
      return done(message, false);
    }
  }),
);
