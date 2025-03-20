const express = require("express");
const interviewRouter = express.Router();

const { auth } = require("../middleware/auth.middleware");

// Get all interviews

interviewRouter.get("/interviews", auth, async (req, res) => {});

// Add new interview

interviewRouter.post("/interviews", auth, async (req, res) => {});

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
