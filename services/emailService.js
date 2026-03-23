const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendToCompany = async (to, applicant, cv) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "New Application",
    text: `${applicant.fullName} applied (${applicant.email})`,
    attachments: [{ path: cv }]
  });
};

exports.sendStatusEmail = async (to, status) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Application Update",
    text: `Your application status: ${status}`
  });
};
