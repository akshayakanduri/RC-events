const nodemailer = require("nodemailer");
require("dotenv").config();

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP login successful");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "SMTP Test",
      text: "This is a test email.",
    });
    console.log(JSON.stringify(process.env.EMAIL_USER));
    console.log(JSON.stringify(process.env.EMAIL_PASS));
    console.log("✅ Test email sent");
  } catch (err) {
    console.error(err);
  }
})();