/** TAC SERVICE BOOKING APP - BACKEND DATABASE CONNECTION FILE **/
/* Please refer to the end of this document for additional references. */

/*
* This file holds the configuration code for the MongoDB Database connection.
* The MongoDB connection string to the "bookingsDB" is saved in the .env config file. 
* The .env file is a convenient way to store environment-specific variables, such as API keys and database connections/passwords, in a simple text file. 
  This enables you to manage sensitive information consistently while maintaining its security.
* dotenv package is used in this connection configuration. dotenv is used to load environment variables from a .env file.
// */

// const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();
// const uri = process.env.MONGO_URI;

// const connectDB = async () => {
//   try {
//     const dBConn = await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB Database");
//   } catch (error) {
//     console.log(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
require("dotenv").config();
const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  try {
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch (e) {
      // fallback if dns.setServers is restricted
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected to Atlas successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

