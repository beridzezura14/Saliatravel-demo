const mongoose = require("mongoose");

const RequireSchema = new mongoose.Schema(
  {
    head: {
      type: String,
      required: false, // optional
    },
    answer: {
      type: [String], // array of short answers
      required: true,
      default: [],
    },
    fullAnswer: {
      type: [String], // array of detailed answers
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Require", RequireSchema);
