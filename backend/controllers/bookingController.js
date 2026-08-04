
/** TAC SERVICE BOOKING APP BACKEND BOOKING CONTROLLER FILE **/

const Booking = require("../models/bookingModel");
const sendBookingEmail = require("../services/emailService");
const PDFDocument = require("pdfkit");
/* Get all service bookings */
const getBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookingsList = await Booking.find({ userId });

    res.status(200).json({
      message: "All service bookings fetched successfully.",
      bookings: bookingsList,
    });
  } catch (error) {
    console.error("Get Bookings Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

/* Get single booking */
const getSingleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const booking = await Booking.findOne({
      _id: id,
      userId,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      message: "Booking fetched successfully.",
      booking,
    });
  } catch (error) {
    console.error("Get Booking Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

/* Create booking */
const createBooking = async (req, res) => {
  try {
    if (req.body.addInfo === "") {
      req.body.addInfo = "None";
    }

    const userId = req.user._id;

    const booking = await Booking.create({
      ...req.body,
      userId,
    });
    await sendBookingEmail(booking);
    const bookingsList = await Booking.find({ userId });

    res.status(201).json({
      message: "Booking scheduled successfully.",
      booking,
      bookings: bookingsList,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* Update booking */
const updateBooking = async (req, res) => {
  try {
    if (req.body.addInfo === "") {
      req.body.addInfo = "None";
    }

    const { id } = req.params;
    const userId = req.user._id;

    const booking = await Booking.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    const bookingsList = await Booking.find({ userId });

    res.status(200).json({
      message: "Booking updated successfully.",
      booking,
      bookings: bookingsList,
    });
  } catch (error) {
    console.error("Update Booking Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* Delete booking */
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const booking = await Booking.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    const bookingsList = await Booking.find({ userId });

    res.status(200).json({
      message: "Booking deleted successfully.",
      bookings: bookingsList,
    });
  } catch (error) {
    console.error("Delete Booking Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* Download Booking Invoice PDF */
const downloadInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const booking = await Booking.findOne({
      _id: id,
      userId,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=MechMate-Invoice-${booking._id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("MechMate Service Invoice", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(12).text(`Work Order ID: ${booking._id}`);
    doc.text(`Customer Name: ${booking.customerFirstName} ${booking.customerLastName}`);
    doc.text(`Email: ${booking.customerEmail}`);
    doc.text(`Contact: ${booking.customerContactNumber}`);

    doc.moveDown();

    doc.text(`Vehicle: ${booking.vehicleMake} ${booking.vehicleModel}`);
    doc.text(`Registration Number: ${booking.vehicleReg}`);
    doc.text(`Service: ${booking.serviceOption}`);
    doc.text(`Booking Date: ${booking.bookingDate}`);
    doc.text(`Status: ${booking.status}`);

    doc.moveDown();

    doc.text("Thank you for choosing MechMate 🚗");

    doc.end();

  } catch (error) {
    console.error("Invoice Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getBookings,
  getSingleBooking,
  createBooking,
  updateBooking,
  deleteBooking,
   downloadInvoice,
};