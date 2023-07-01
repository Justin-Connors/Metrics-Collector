const mongoose = require("mongoose");
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/metrics-collector",
    connectOptions
  )
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
