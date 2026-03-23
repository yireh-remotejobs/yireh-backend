const express = require("express");
const router = express.Router();
const Internship = require("../models/Internship");
const protect = require("../middleware/protect");

router.get("/", async (req, res) => {
  const data = await Internship.find().sort({ createdAt: -1 });
  res.json(data);
});

router.post("/", protect, async (req, res) => {
  const item = await Internship.create(req.body);
  res.json(item);
});

module.exports = router;
