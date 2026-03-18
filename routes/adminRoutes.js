const InternshipApplication = require("../models/InternshipApplication");

// GET ALL APPLICATIONS
router.get("/internship-applications", protect, async (req, res) => {
  const apps = await InternshipApplication.find().populate("internship");
  res.json(apps);
});

// UPDATE STATUS
router.put("/internship-application/:id", protect, async (req, res) => {
  const { status } = req.body;

  const app = await InternshipApplication.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  const { sendStatusEmail } = require("../services/emailService");
  await sendStatusEmail(app.email, status);

  res.json({ message: "Status updated" });
});

// DELETE
router.delete("/internship-application/:id", protect, async (req, res) => {
  await InternshipApplication.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
