
const nodemailer = require("nodemailer");

const sendBookingEmail = async (booking) => {
  console.log("EMAIL FUNCTION STARTED");
  console.log("Sending email to:", booking.customerEmail);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("SMTP connection successful");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: booking.customerEmail,
      subject: "MechMate Booking Confirmation",
      html: `
        <h2>MechMate Service Booking Confirmed 🚗</h2>

        <p>Hello ${booking.customerFirstName},</p>

        <p>Your service booking has been successfully scheduled.</p>

        <h3>Booking Details:</h3>

        <p><b>Work Order ID:</b> ${booking._id}</p>
        <p><b>Vehicle:</b> ${booking.vehicleMake} ${booking.vehicleModel}</p>
        <p><b>Registration:</b> ${booking.vehicleReg}</p>
        <p><b>Service:</b> ${booking.serviceOption}</p>
        <p><b>Booking Date:</b> ${booking.bookingDate}</p>
        <p><b>Status:</b> ${booking.status}</p>

        <br/>

        <p>Thank you for choosing MechMate ❤️</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT SUCCESSFULLY:", info.messageId);

  } catch (error) {
    console.log("EMAIL ERROR:", error);
    throw error;
  }
};

module.exports = sendBookingEmail;