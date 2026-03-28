const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

/* POST JOB (PUBLIC) */
router.post("/", async (req, res) => {
  try {
    const job = await Job.create({
      company: req.body.company,
      email: req.body.email,
      title: req.body.title,
      country: req.body.country,
      city: req.body.city,
      salary: req.body.salary,
      type: req.body.type,
      description: req.body.description,
      logo: req.body.logo || ""
    });

    res.json({ message: "Job posted successfully", job });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* GET JOBS */
router.get("/", async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

module.exports = router;
