// models/Country.js
const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  title: { type: String, required: true },      
  image: { type: String, required: true },     
  createdAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model("Country", countrySchema);
