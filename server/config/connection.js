const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/metrics-collector"
  )
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((err) => console.log("there was an error with connection:", err));

module.exports = mongoose.connection;
