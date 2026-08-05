
const Feedback = require("../models/feedbackModel");

// Create Feedback
const createFeedback = async (req, res) => {
  try {
    const { bookingId, rating, review } = req.body;

    const userId = req.user._id;

    // Check if feedback already exists
    const existingFeedback = await Feedback.findOne({
      bookingId,
      userId,
    });

    if (existingFeedback) {
      return res.status(400).json({
        message: "Feedback already submitted for this booking.",
      });
    }

    const feedback = await Feedback.create({
      bookingId,
      userId,
      rating,
      review,
    });

    res.status(201).json({
      message: "Feedback submitted successfully.",
      feedback,
    });
  } catch (error) {
    console.error("Create Feedback Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Feedbacks
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("userId", "firstName lastName")
      .populate("bookingId");

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Get Feedback Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createFeedback,
  getFeedbacks,
};