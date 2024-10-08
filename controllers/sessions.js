const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const User = require("../models/user");  // Assuming you already have a User model


// Set up session management with MongoDB
const sessionMiddleware = session({
  secret: "your-secret-key", // Replace with your own secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: "mongodb+srv://sandman:sobriety@cluster0.lr58k.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0", // MongoDB URL
    collectionName: "sessions",  // Collection to store sessions
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day session
});

const SessionsController = {
  Index: (req, res) => {
    // Send back the user data from session if available
    res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.send({ user: req.session.user });
  },

  Create: (req, res) => {
    User.findOne({ username: req.body.username }).then((user) => {
      if (!user) {
        res.status(409).send({ message: "Invalid credentials" });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(500).send({ message: "Error during authentication" });
          }

          if (result) {
            // Set the session with user information
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            req.session.user = {
              _id: user._id,
              username: user.username,
              email: user.email,
            };
            res.status(200).send({ message: "Login successful" });
          } else {
            res.status(409).send({ message: "Invalid credentials" });
          }
        });
      }
    });
  },

  Destroy: (req, res) => {
    // Destroy the user session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send({ message: "Error while logging out" });
      }
      res.status(200).send({ message: "Logged out successfully" });
    });
  },
};

module.exports = { SessionsController, sessionMiddleware };
