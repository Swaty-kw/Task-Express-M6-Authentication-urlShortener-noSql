const express = require("express");
const connectDb = require("./database");
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const passport = require("passport");
const { localStrategy, JwtStrategy } = require("./middlewares/passPort");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
connectDb();

app.use(express.json());
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", JwtStrategy);

app.use("/urls", urlRoutes);
app.use(userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
