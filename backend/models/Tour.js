const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
  id: Number,
  head: String,
  paragraph: String,
});

const TourSchema = new mongoose.Schema({
  head: { type: String, required: true },
  img: { type: String }, // შენ შეგიძლია ფაილი ან url
  includes: String,
  details: {
    day: [DaySchema],
    inPrice: [String],
    additionTours: [String],
    mustPay: [String],
  },
}, { timestamps: true });

module.exports = mongoose.model("Tour", TourSchema);
