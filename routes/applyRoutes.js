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
const sendEmail = require("../services/emailService");

router.post("/", async (req,res)=>{
  try{
    const { jobId, name, email } = req.body;

    await Application.create({ jobId, name, email });

    // SEND EMAIL
    await sendEmail(
      "yireh.remotejobs@gmail.com",
      "New Job Application",
      `New applicant:\nName: ${name}\nEmail: ${email}`
    );

    res.json({ message:"Application submitted & email sent" });

  }catch(err){
    console.log(err);
    res.status(500).json({ message:"Server error" });
  }
});
module.exports = router;
