const express = require("express");
const router = express.Router();
const multer = require("multer");

const Application = require("../models/Application");
const Job = require("../models/Job");
const Internship = require("../models/Internship");
const { sendToCompany } = require("../services/emailService");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// APPLY JOB
router.post("/job/:id", upload.single("cv"), async (req, res) => {
  const job = await Job.findById(req.params.id);

  const app = await Application.create({
    job: job._id,
    fullName: req.body.fullName,
    email: req.body.email,
    cv: req.file.path
  });

  await sendToCompany(job.email, req.body, req.file.path);

  res.json({ message: "Applied to job" });
});

// APPLY INTERNSHIP
router.post("/internship/:id", upload.single("cv"), async (req, res) => {
  const item = await Internship.findById(req.params.id);

  const app = await Application.create({
    internship: item._id,
    fullName: req.body.fullName,
    email: req.body.email,
    cv: req.file.path
  });

  await sendToCompany(item.email, req.body, req.file.path);

  res.json({ message: "Applied to internship" });
});

module.exports = router;
