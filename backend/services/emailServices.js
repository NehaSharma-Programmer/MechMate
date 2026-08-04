
const nodemailer = require("nodemailer");

const sendBookingEmail = async (booking) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.customerEmail,
    subject: "MechMate Booking Confirmation",
    html: `
      <h2>MechMate Service Booking Confirmed</h2>

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

      <p>Thank you for choosing MechMate 🚗</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendBookingEmail;