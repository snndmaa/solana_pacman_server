const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const User = require("../models/user");  // Assuming you already have a User model

// MongoDB connection
// mongoose.connect("mongodb://localhost:27017/pacman", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Set up session management with MongoDB
const sessionMiddleware = session({
  secret: "your-secret-key", // Replace with your own secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: "mongodb://localhost:27017/pacman", // MongoDB URL
    collectionName: "sessions",  // Collection to store sessions
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day session
});

const SessionsController = {
  Index: (req, res) => {
    // Send back the user data from session if available
    if (req.session.user) {
      res.send({ user: req.session.user });
    } else {
      res.status(401).send({ message: "No user session found" });
    }
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
            req.session.user = user
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
