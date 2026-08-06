
const router = require("express").Router();

const { chatWithAI } = require("../controllers/chatbotController");

router.post("/", chatWithAI);

module.exports = router;