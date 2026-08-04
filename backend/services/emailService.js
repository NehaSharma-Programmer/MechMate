
const nodemailer = require("nodemailer");

const sendBookingEmail = async (booking) => {
  console.log("EMAIL FUNCTION STARTED");
  console.log("Sending email to:", booking.customerEmail);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.verify();
    console.log("SMTP CONNECTION SUCCESSFUL");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: booking.customerEmail,
      subject: "MechMate Booking Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>🚗 MechMate Service Booking Confirmed</h2>

          <p>Hello <b>${booking.customerFirstName}</b>,</p>

          <p>
            Your service booking has been successfully scheduled.
          </p>

          <h3>Booking Details:</h3>

          <p><b>Work Order ID:</b> ${booking._id}</p>
          <p><b>Vehicle:</b> ${booking.vehicleMake} ${booking.vehicleModel}</p>
          <p><b>Registration:</b> ${booking.vehicleReg}</p>
          <p><b>Service:</b> ${booking.serviceOption}</p>
          <p><b>Booking Date:</b> ${booking.bookingDate}</p>
          <p><b>Status:</b> ${booking.status}</p>

          <br/>

          <p>
            Thank you for choosing <b>MechMate</b> 🚗
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT SUCCESSFULLY:", info.messageId);

  } catch (error) {
    console.log("MAIL ERROR:", error.message);
    throw error;
  }
};

module.exports = sendBookingEmail;