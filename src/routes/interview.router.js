const express = require("express");
const interviewRouter = express.Router();

// Get all interviews

interviewRouter.get("/interviews", async (req, res) => {});

// Add new interview

interviewRouter.post("/interviews", async (req, res) => {});

// Assign student to interview

interviewRouter.put(
  "/interviews/:interviewID/assign/:studentID",
  async (req, res) => {}
);

// View all students assigned to an interview

interviewRouter.get(
  "/interviews/:interviewID/students",
  async (req, res) => {}
);

module.exports = { interviewRouter };
