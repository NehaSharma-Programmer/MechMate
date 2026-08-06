
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are MechMate AI Assistant.

You only answer questions related to:
- Car service
- Bike service
- Vehicle maintenance
- Booking appointments
- Feedback
- Invoice
- MechMate website

If the question is unrelated, politely say:
"I can only help with MechMate services."

Customer Question:
${message}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({
      reply: response,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "AI Server Error",
    });
  }
};

module.exports = {
  chatWithAI,
};