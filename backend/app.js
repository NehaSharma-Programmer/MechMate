
/** TAC SERVICE BOOKING APP - BACKEND SERVER FILE **/

// Fix MongoDB SRV DNS issue
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  console.log("DNS setup skipped");
}

// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const app = express();

// Routes
const routes = require("./routes/routes");
const userLoginRoutes = require("./routes/user");
const feedbackRoutes = require("./routes/feedbackRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
// Database
const connectDB = require("./dbs/db");


/* Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());


/* API Routes */
app.use("/api/bookings", routes);
app.use("/api", userLoginRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/chatbot", chatbotRoutes);

/* MongoDB Connection */
connectDB();


/* Server */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});