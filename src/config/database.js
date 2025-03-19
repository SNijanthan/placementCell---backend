const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async () => {
  return await mongoose.connect(process.env.URI);
};

module.exports = { connectToDB };
