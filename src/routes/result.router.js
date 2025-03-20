const express = require("express");
const resultRouter = express.Router();

const { auth } = require("../middleware/auth.middleware");

const { StudentModel } = require("../models/student.model");
const { InterviewModel } = require("../models/interview.model");
const { ResultModel } = require("../models/result.model");

const SAFE_DATA = "name college status dsaScore webDScore reactScore";

// Get all results

resultRouter.get("/results", auth, async (req, res) => {
  try {
    const results = await ResultModel.find()
      .select("student interview result")
      .populate("student", SAFE_DATA)
      .populate("interview", "interviewDate companyName");

    if (results.length === 0) {
      return res.status(404).json({ message: "Results not exist..!" });
    }

    res.status(200).json({ message: "Data retrived successfully", results });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

// Update student result for an interview

resultRouter.post("/results", auth, async (req, res) => {
  try {
    const { studentID, interviewID, result } = req.body;

    if (!["PASS", "FAIL", "ON_HOLD", "DID_NOT_ATTEND"].includes(result)) {
      return res.status(400).json({ message: "Invalid result status" });
    }

    const student = await StudentModel.findById(studentID);

    const interview = await InterviewModel.findById(interviewID);

    if (!student || !interview) {
      return res
        .status(404)
        .json({ message: "Student or interview does not exist..!" });
    }

    const existingResult = await ResultModel.findOne({
      student: studentID,
      interview: interviewID,
    });

    if (existingResult) {
      return res
        .status(409)
        .json({ message: "Result already recorded for this interview..!" });
    }

    const newResult = new ResultModel({
      student: studentID,
      interview: interviewID,
      result,
    });

    if (result === "PASS") {
      await StudentModel.findByIdAndUpdate(studentID, { status: "placed" });
    }

    await newResult.save();

    const populateResult = await ResultModel.findById(newResult._id)
      .populate("student", SAFE_DATA)
      .populate("interview", "interviewDate companyName");

    res
      .status(201)
      .json({ message: "Result updated successfully", populateResult });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

module.exports = { resultRouter };
