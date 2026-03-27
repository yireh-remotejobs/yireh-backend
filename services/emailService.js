const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, file) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments: file ? [{
      filename: file.originalname,
      content: file.buffer
    }] : []
  });
};

module.exports = sendEmail;
