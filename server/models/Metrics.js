const mongoose = require("mongoose");

const { Schema } = mongoose;

const metricsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Metrics = mongoose.model("Metrics", metricsSchema);
module.exports = Metrics;
