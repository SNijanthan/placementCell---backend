const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },

    interview: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Interview",
    },
    result: {
      type: String,
      required: true,
      enum: {
        values: ["PASS", "FAIL", "ON_HOLD", "DID_NOT_ATTEND"],
        message: "{VALUE} is not defined",
      },
    },
  },
  { timestamps: true }
);

const ResultModel = mongoose.model("Result", resultSchema);

module.exports = { ResultModel };
