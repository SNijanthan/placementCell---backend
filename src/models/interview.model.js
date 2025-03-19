const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    interviewDate: { type: Date, required: true, default: Date.now },
    companyName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
      index: true,
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);

const InterviewModel = mongoose.model("Interview", interviewSchema);

module.exports = { InterviewModel };
