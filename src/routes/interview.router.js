const express = require("express");
const interviewRouter = express.Router();

const { auth } = require("../middleware/auth.middleware");

const { InterviewModel } = require("../models/interview.model");

// Get all interviews

interviewRouter.get("/interviews", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const total = await InterviewModel.countDocuments();

    const interviews = await InterviewModel.find()
      .skip(skip)
      .limit(limit)
      .select("interviewDate companyName students");

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

interviewRouter.put(
  "/interviews/:interviewID/assign/:studentID",
  auth,
  async (req, res) => {}
);

// View all students assigned to an interview

interviewRouter.get(
  "/interviews/:interviewID/students",
  auth,
  async (req, res) => {}
);

module.exports = { interviewRouter };
