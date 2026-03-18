const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// SEND TO COMPANY
const sendToCompany = async (companyEmail, applicant, cvPath) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: companyEmail,
    subject: "New Internship Application",
    text: `${applicant.fullName} applied.\nEmail: ${applicant.email}`,
    attachments: [
      { path: cvPath }
    ]
  });
};

// SEND RESPONSE TO CANDIDATE
const sendStatusEmail = async (candidateEmail, status) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: candidateEmail,
    subject: "Application Update",
    text: `Your application status: ${status}`
  });
};

module.exports = { sendToCompany, sendStatusEmail };
