const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100,
      trim: true,
    },
    college: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      lowercase: true,
      enum: {
        values: ["placed", "not_placed"],
        message:
          "{VALUE} is not defined, Defined valued - [placed, not_placed]",
      },
    },
    dsaScore: { type: Number, default: null, min: 0, max: 100 },
    webDScore: { type: Number, default: null, min: 0, max: 100 },
    reactScore: { type: Number, default: null, min: 0, max: 100 },
  },
  { timestamps: true }
);

const StudentModel = mongoose.model("Student", studentSchema);

module.exports = { StudentModel };
