const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: String,
  email: String,
  title: String,
  country: String,
  city: String,
  salary: String,
  type: String,
  description: String,
  logo: String
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
