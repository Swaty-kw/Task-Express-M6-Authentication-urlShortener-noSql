const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const localStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (username, password, done) => {
    try {
      const foundUser = await User.findOne({ username: username }); //find the user
      if (!foundUser)
        return done({ message: "Username or password incorrect" });
      const isMatch = await bcrypt.compare(password, foundUser.password); //check password
      if (!isMatch) return done({ message: "Username or password incorrect" });
      return done(null, foundUser); //req.user //go to controller if all's good
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = { localStrategy };