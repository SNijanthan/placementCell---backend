const express = require("express");
const resultRouter = express.Router();

const ExcelJS = require("exceljs");

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

// Downloading results in CSV format

resultRouter.get("/results/download-csv", async (req, res) => {
  try {
    const results = await ResultModel.find()
      .populate("student", SAFE_DATA)
      .populate("interview", "interviewDate companyName");

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Results");

    // Define the columns
    worksheet.columns = [
      { header: "ID", key: "_id", width: 25 },
      { header: "Name", key: "name", width: 20 },
      { header: "College", key: "college", width: 20 },
      { header: "Status", key: "status", width: 15 },
      { header: "DSA Score", key: "dsaScore", width: 15 },
      { header: "WebD Score", key: "webDScore", width: 15 },
      { header: "React Score", key: "reactScore", width: 15 },
      { header: "Interview Date", key: "interviewDate", width: 20 },
      { header: "Company Name", key: "companyName", width: 20 },
      { header: "Result", key: "result", width: 15 },
      { header: "Created At", key: "createdAt", width: 25 },
      { header: "Updated At", key: "updatedAt", width: 25 },
    ];

    // Add rows to the worksheet
    results.forEach((result) => {
      worksheet.addRow({
        _id: result._id.toString(),
        name: result.student?.name || "N/A",
        college: result.student?.college || "N/A",
        status: result.student?.status || "N/A",
        dsaScore: result.student?.dsaScore || "N/A",
        webDScore: result.student?.webDScore || "N/A",
        reactScore: result.student?.reactScore || "N/A",
        interviewDate: result.interview?.interviewDate || "N/A",
        companyName: result.interview?.companyName || "N/A",
        result: result.result,
        createdAt: result.createdAt.toISOString(),
        updatedAt: result.updatedAt.toISOString(),
      });
    });

    // Set response headers for file download
    res.setHeader("Content-Disposition", "attachment; filename=results.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Write file to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { resultRouter };
