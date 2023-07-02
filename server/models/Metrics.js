const mongoose = require("mongoose");

const { Schema } = mongoose;

const metricsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  labels: [
    {
      key: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  values: [
    {
      value: {
        type: Number,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
        required: true,
      },
    },
  ],
});

const Metrics = mongoose.model("Metrics", metricsSchema);
module.exports = Metrics;
