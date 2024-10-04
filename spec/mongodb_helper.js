const mongoose = require("mongoose");

beforeAll((done) => {
  const uri = "mongodb+srv://sandman:sobriety@cluster0.lr58k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  
  mongoose.connect(uri)
    .then(() => {
      console.log("MongoDB connected successfully.");
      done();
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      done(err); // Call done with error to fail the test setup
    });
});

afterAll((done) => {
  mongoose.connection.close(true, (err) => {
    if (err) {
      console.error("Error closing MongoDB connection:", err);
    } else {
      console.log("MongoDB connection closed.");
    }
    done(); // Always call done to signal completion
  });
});
