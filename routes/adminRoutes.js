const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const Application = require("../models/Application");
const { sendStatusEmail } = require("../services/emailService");

// GET APPLICATIONS
router.get("/applications", protect, async (req, res) => {
  const apps = await Application.find()
    .populate("job")
    .populate("internship");

  res.json(apps);
});

// UPDATE STATUS
router.put("/application/:id", protect, async (req, res) => {
  const app = await Application.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  await sendStatusEmail(app.email, req.body.status);

  res.json(app);
});

// DELETE
router.delete("/application/:id", protect, async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// DOWNLOAD CV
router.get("/download/:id", protect, async (req, res) => {
  const app = await Application.findById(req.params.id);
  res.download(app.cv);
});

module.exports = router;
