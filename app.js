const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");

const {sessionMiddleware} = require("./controllers/sessions")

const usersRouter = require("./routes/users");
const sessionsRouter = require("./routes/sessions");
const scoresRouter = require("./routes/scores");

const app = express();

const url = process.env.REACT_APP_URL || "http://localhost:3000";

app.use(logger("dev"));
app.use(express.json());
app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(
  cors({
    origin: url,
    credentials: true,
  })
);

app.use(
  session({
    key: "user_sid",
    secret: "super_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.use("/users", usersRouter);
app.use("/sessions", sessionsRouter);
app.use("/scores", scoresRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  next(err);
});

module.exports = app;
