const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

router.post("/", async (req, res) => {
  try {
    const { jobId, name, email } = req.body;

    await Application.create({
      job: jobId,
      fullName: name,
      email: email
    });

    res.json({ message: "Application submitted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error sending application" });
  }
});

module.exports = router;
