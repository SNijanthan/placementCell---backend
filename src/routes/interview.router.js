const express = require("express");
const interviewRouter = express.Router();

const { auth } = require("../middleware/auth.middleware");

const { InterviewModel } = require("../models/interview.model");
const { StudentModel } = require("../models/student.model");

const SAFE_DATA = "name college status dsaScore webDScore reactScore";

// Get all interviews

interviewRouter.get("/interviews", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    const total = await InterviewModel.countDocuments();

    const interviews = await InterviewModel.find()
      .skip(skip)
      .limit(limit)
      .select("interviewDate companyName students")
      .populate("students", SAFE_DATA);

    if (interviews.length === 0) {
      return res.status(200).json({ message: "No interviews found..!" });
    }

    res.status(200).json({
      message: "Data fetched successfully ..!",
      interviews,
      total,
      page,
      limit,
    });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

// Add new interview

interviewRouter.post("/interviews", auth, async (req, res) => {
  try {
    const { interviewDate, companyName } = req.body;

    // Verifying interview format and cannot pass empty data

    if (!interviewDate || isNaN(new Date(interviewDate))) {
      throw new Error("Invalid or missing interview date");
    }

    if (!companyName) {
      throw new Error("Company field cannot be empty");
    }

    // Checks if the same data already presents in DB

    const existingInterview = await InterviewModel.findOne({
      interviewDate: new Date(interviewDate),
      companyName,
    });

    if (existingInterview) {
      return res.status(409).json({ message: "Interview already exists ..!" });
    }

    // Adding new interview into DB

    const interview = new InterviewModel({
      interviewDate: new Date(interviewDate),
      companyName,
    });

    await interview.save();

    res
      .status(201)
      .json({ message: "Interview created successfully", interview });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.message}` });
  }
});

// Assign student to interview

interviewRouter.patch(
  "/interviews/:interviewID/assign/:studentID",
  auth,
  async (req, res) => {
    try {
      const { interviewID, studentID } = req.params;

      // Check if interview exists
      const interview = await InterviewModel.findById(interviewID);
      if (!interview) {
        return res.status(404).json({ message: "Interview not found!" });
      }

      // Check if student exists
      const student = await StudentModel.findById(studentID);
      if (!student) {
        return res.status(404).json({ message: "Student not found!" });
      }

      // Update interview by adding student to students array
      const updatedInterview = await InterviewModel.findByIdAndUpdate(
        interviewID,
        { $addToSet: { students: studentID } }, // Prevents duplicate entries
        { runValidators: true, new: true }
      ).populate("students", SAFE_DATA); // Ensure full student data is returned

      res.status(200).json({
        message: `Interview assigned to ${student.name}`,
        updateInterview: updatedInterview,
      });
    } catch (error) {
      res.status(500).json({ message: `Server Error: ${error.message}` });
    }
  }
);

// View all students assigned to an interview

interviewRouter.get(
  "/interviews/:interviewID/students",
  auth,
  async (req, res) => {
    try {
      const { interviewID } = req.params;

      const interview = await InterviewModel.findById(interviewID)
        .select("interviewDate companyName")
        .populate("students", SAFE_DATA);

      if (!interview) {
        return res.status(404).json({ message: "Interview does not exist..!" });
      }

      res.status(200).json({ message: "Data fetched successfully", interview });
    } catch (error) {
      res.status(500).json({ message: `Server Error: ${error.message}` });
    }
  }
);

// Assigned Interviews

interviewRouter.get("/assign/interviews", auth, async (req, res) => {
  try {
    const interview = await InterviewModel.find()
      .select("interviewDate companyName")
      .populate("students", SAFE_DATA);

    if (!interview) {
      return res.status(404).json({ message: "Interview does not exist..!" });
    }

    res.status(200).json({ message: "Data fetched successfully", interview });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});

module.exports = { interviewRouter };
