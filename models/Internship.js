const mongoose = require("mongoose");

const internshipApplicationSchema = new mongoose.Schema({
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Internship",
    required: true
  },

  fullName: String,
  email: String,
  cv: String,

  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("InternshipApplication", internshipApplicationSchema);
