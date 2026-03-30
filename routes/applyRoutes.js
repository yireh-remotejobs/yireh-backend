const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const sendEmail = require("../services/emailService");

router.post("/", async (req, res) => {
  try {
    const { jobId, name, email } = req.body;

    // SAVE TO DATABASE
    await Application.create({
      job: jobId,
      fullName: name,
      email: email
    });

    // SEND EMAIL
    await sendEmail(
      "yireh.remotejobs@gmail.com",
      "New Job Application",
      `New applicant:\nName: ${name}\nEmail: ${email}`
    );

    res.json({ message: "Application submitted & email sent" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error sending application" });
  }
});

module.exports = router;
