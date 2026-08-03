
/** TAC SERVICE BOOKING APP - MONGOOSE USER SCHEMA MODEL FILE **/

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});


/* STATIC ACCOUNT CREATION METHOD */
userSchema.statics.createAcc = async function (
  firstName,
  lastName,
  email,
  password
) {

  console.log("CREATE ACCOUNT FUNCTION STARTED");

  // validation
  if (!firstName || !lastName || !email || !password) {
    throw Error("All fields must be filled");
  }


  if (!validator.isStrongPassword(password)) {
    throw Error("Password Not Strong Enough");
  }


  // checking whether user already exists
  console.log("CHECKING EMAIL");

  const exists = await this.findOne({ email });


  console.log("EMAIL CHECK RESULT:", exists);


  if (exists) {
    throw Error("Email Address Already In Use");
  }


  // hashing password
  console.log("HASHING PASSWORD");

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);


  // creating user
  console.log("CREATING USER");


  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
  });


  console.log("USER CREATED:", user.email);


  return user;
};



/* STATIC LOGIN METHOD */
userSchema.statics.login = async function (email, password) {

  console.log("LOGIN FUNCTION STARTED");


  if (!email || !password) {
    throw Error("All fields must be filled");
  }


  const user = await this.findOne({ email });


  console.log("LOGIN USER FOUND:", user);


  if (!user) {
    throw Error("Invalid email address and/or password");
  }


  const match = await bcrypt.compare(password, user.password);


  console.log("PASSWORD MATCH:", match);


  if (!match) {
    throw Error("Invalid email address and/or password");
  }


  return user;
};



module.exports = mongoose.model("User", userSchema);