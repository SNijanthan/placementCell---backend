const mongoose = require("mongoose");

const connectToDB = async () => {
  await mongoose.connect(
    "mongodb+srv://nijanthan378:utLcRCEy3nGYt1HF@placement-cell.zxym6.mongodb.net/placementCell"
  );
};

module.exports = { connectToDB };
