const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    mapEmbed: { type: String, required: false }, // Google Maps iframe კოდი
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
