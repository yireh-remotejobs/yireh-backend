const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: String,
  type: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
