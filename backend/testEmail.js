const nodemailer = require("nodemailer");
require("dotenv").config();

async function testMail() {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "zuraberidze12@gmail.com",
    subject: "Test Mail",
    text: "Hello from Nodemailer"
  });

  console.log("Email sent!");
}

testMail().catch(console.error);
