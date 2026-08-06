
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
      model: "gemini-3-flash-preview",
    });

    const prompt = `
You are MechMate AI Assistant, a friendly AI chatbot for a vehicle service booking application.

Your behavior:
- Always greet users naturally.
- Answer casual conversations like "hello", "how are you", "what is your name" in a friendly way.
- Help users with car and bike servicing, maintenance tips, repair guidance, booking appointments, invoices, and MechMate features.
- Do not force every answer to be about vehicle services.
- Keep answers short, clear, and helpful.
- If you don't know something, politely say you can help with MechMate services.

Examples:

User: How are you?
Assistant: I'm doing great! 😊 I'm MechMate AI Assistant. How can I help you today?

User: What can you do?
Assistant: I can help you with vehicle services, maintenance tips, service bookings, and MechMate related queries.

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