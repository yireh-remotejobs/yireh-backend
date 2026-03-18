const express = require("express");
const router = express.Router();
const multer = require("multer");

const Internship = require("../models/Internship");
const InternshipApplication = require("../models/InternshipApplication");
const { sendToCompany } = require("../services/emailService");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/:id", upload.single("cv"), async (req, res) => {
  try {
    const { fullName, email } = req.body;

    const internship = await Internship.findById(req.params.id);

    const application = await InternshipApplication.create({
      internship: internship._id,
      fullName,
      email,
      cv: req.file.path
    });

    await sendToCompany(
      internship.email,
      { fullName, email },
      req.file.path
    );

    res.json({ message: "Application submitted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error applying" });
  }
});

module.exports = router;
