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


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(sessionMiddleware); // To manage sessions with MongoDB

// const allowedDomain = 'https://solana-pacman-client.vercel.app';  // Replace with your trusted domain
const allowedDomain = 'http://localhost:3000';

app.use(cors({
  origin: allowedDomain, // Allow requests from this domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow all common HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],  // Allow common headers
  credentials: true,  // Allow cookies or other credentials
  preflightContinue: false,  // Do not pass the preflight request to the next handler
  optionsSuccessStatus: 204  // Some legacy browsers (e.g., IE11) choke on 204
}));

// Handle preflight requests (OPTIONS)
app.options('*', cors({
  origin: allowedDomain,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true
}));


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
