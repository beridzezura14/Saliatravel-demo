const mongoose = require("mongoose");

const InstaSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String },
    price: { type: Number },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Insta", InstaSchema);
