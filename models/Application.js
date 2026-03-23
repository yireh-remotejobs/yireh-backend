const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  internship: { type: mongoose.Schema.Types.ObjectId, ref: "Internship" },

  fullName: String,
  email: String,
  cv: String,

  status: {
    type: String,
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cv: {
      type: String, // store file path or URL
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
