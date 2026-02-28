const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  duration: String,
  stipend: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Internship", internshipSchema);
