const express = require("express");
const studentRouter = express.Router();

const { auth } = require("../middleware/auth.middleware");
const { validateStudentData } = require("../utils/validator");

const { StudentModel } = require("../models/student.model");

// Get all students

studentRouter.get("/students", auth, async (req, res) => {
  try {
    // Pagination

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.skip) || 10;

    const skip = (page - 1) * limit;

    const students = await StudentModel.find()
      .select("name college status dsaScore webDScore reactScore")
      .skip(skip)
      .limit(limit);

    if (students.length === 0) {
      return res.status(200).message({ message: "No students found ..!" });
    }

    const total = await StudentModel.countDocuments();

    res.status(200).json({
      message: "Data retrieved successfully ..!",
      students,
      total,
      page,
      limit,
    });
  } catch (error) {
    res.status(401).json({ message: `ERROR: ${error.message}` });
  }
});

// Add new student

studentRouter.post("/students", auth, async (req, res) => {
  try {
    validateStudentData(req);

    const { name, college, status, dsaScore, webDScore, reactScore } = req.body;

    const existingStudent = await StudentModel.findOne({ name, college });

    if (existingStudent) {
      return res
        .status(409)
        .json({ message: "Student with this name and college already exists" });
    }

    const student = new StudentModel({
      name,
      college,
      status,
      dsaScore,
      webDScore,
      reactScore,
    });

    await student.save();

    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.message}` });
  }
});

module.exports = { studentRouter };
