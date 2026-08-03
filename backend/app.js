
/** TAC SERVICE BOOKING APP - BACKEND SERVER FILE **/

// Fix MongoDB SRV DNS issue
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

// Load environment variables
require("dotenv").config();

/* Require necessary files and modules */
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bp = require("body-parser");

const routes = require("./routes/routes");
const userLoginRoutes = require("./routes/user");

/* Middleware */
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

/* Routes */
app.use("/api/bookings", routes);
app.use("/api", userLoginRoutes);

/* MongoDB Connection */
const connectDB = require("./dbs/db");
connectDB();

/* Start Server */
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});