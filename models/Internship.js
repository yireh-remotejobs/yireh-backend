const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  company: String,
  email: String,
  title: String,
  country: String,
  city: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Internship", internshipSchema);
