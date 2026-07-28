const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log("Mail Error:", error);
    } else {
        console.log("Mail Server is ready");
    }
});

const sendBookingEmail = async (
  userEmail,
  userName,
  event
) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `🎉 Booking Approved - ${event.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
          
          <div style="background:#0d6efd; color:white; padding:20px; text-align:center;">
            <h2>RC Events</h2>
          </div>

          <div style="padding:25px;">
            <h3>Hello ${userName},</h3>

            <p>Great news! 🎉</p>

            <p>Your booking request for the following event has been <strong style="color:green;">APPROVED</strong>.</p>

            <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin:20px 0;">
  <h3 style="margin-top:0;">Event Details</h3>

  <p><strong>📌 Event:</strong> ${event.title}</p>
  <p><strong>📅 Date:</strong> ${event.date}</p>
  <p><strong>🕒 Time:</strong> ${event.time}</p>
  <p><strong>📍 Location:</strong> ${event.location}</p>
  <p><strong>💰 Payment:</strong> ₹${event.payment}</p>
  <p><strong>👔 Dress Code:</strong> ${event.dressCode || "Not Specified"}</p>
</div>

            <br>

            <p>We look forward to seeing you at the event.</p>

            <p>If you have any questions, feel free to contact our team.</p>

<p>
  📧 <strong>rcevents09@gmail.com</strong><br>
  📞 <strong>+91 9353899973</strong>
</p>

            <br>

            <p>Thank you for choosing <strong>RC Events</strong>.</p>

            <hr>

            <p style="font-size:12px;color:#777;">
              This is an automated email. Please do not reply.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("Approval email sent to", userEmail);

  } catch (error) {
    console.error("Error sending approval email:", error);
  }
};

const sendRejectionEmail = async (userEmail, userName, eventTitle) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Booking Request Update - RC Events`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:8px; overflow:hidden;">

          <div style="background:#dc3545; color:white; padding:20px; text-align:center;">
            <h2>RC Events</h2>
          </div>

          <div style="padding:25px;">

            <h3>Hello ${userName},</h3>

            <p>Thank you for your interest in <strong>RC Events</strong>.</p>

            <p>
              We regret to inform you that your booking request for
              <strong>${eventTitle}</strong>
              could not be approved at this time.
            </p>

            <p>
              This may be due to limited vacancies or event-specific requirements.
            </p>

            <p>
              We encourage you to explore and apply for our upcoming events.
            </p>

            <br>

            <p><strong>Need Help?</strong></p>

            <p>
              📧 rcevents09@gmail.com <br>
              📞 +91 9353899973
            </p>

            <hr>

            <p style="font-size:12px;color:#777;">
              This is an automated email. Please do not reply.
            </p>

          </div>

        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    console.log("Rejection email sent to", userEmail);

  } catch (error) {
    console.error("Error sending rejection email:", error);
  }
};

const sendOTPEmail = async (userEmail, otp, type) => {
    try {
        const title = type === 'account_verification' ? 'Verify your EventManagement Account' : 'EventManagement Booking Verification';
        const msg = type === 'account_verification'
            ? 'Please use the following OTP to verify your new EventManagement account.'
            : 'Please use the following OTP to verify and confirm your event booking.';

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: title,
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2 style="color: #111;">${title}</h2>
                    <p style="color: #555; font-size: 16px;">${msg}</p>
                    <div style="margin: 20px auto; padding: 15px; font-size: 24px; font-weight: bold; background: #f4f4f4; width: max-content; letter-spacing: 5px;">
                        ${otp}
                    </div>
                    <p style="color: #999; font-size: 12px;">This code expires in 5 minutes. If you didn't request this, please ignore this email.</p>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${userEmail} for ${type}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
};

module.exports = {
  sendBookingEmail,
  sendRejectionEmail,
  sendOTPEmail,
};