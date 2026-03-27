const express = require("express");
const router = express.Router();
const multer = require("multer");

const Job = require("../models/Job");
const sendEmail = require("../services/emailService");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// APPLY JOB
router.post("/", upload.single("cv"), async (req, res) => {
  try {
    const { jobId, name, email } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await sendEmail(
      job.email,
      "New Job Application",
      `New applicant:\n\nName: ${name}\nEmail: ${email}`,
      req.file
    );

    res.json({ message: "Application sent successfully ✅" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending application" });
  }
});

module.exports = router;
