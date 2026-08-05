const router = require("express").Router();

const {
  createFeedback,
  getFeedbacks,
} = require("../controllers/feedbackController");

const requireAuth = require("../middleware/requireAuth");

// Protect all feedback routes
router.use(requireAuth);

// Get all feedbacks
router.get("/", getFeedbacks);

// Submit feedback
router.post("/", createFeedback);

module.exports = router;
