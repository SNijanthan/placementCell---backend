const express = require("express");
const studentRouter = express.Router();

const { auth } = require("../middleware/auth.middleware");

// Get all students

studentRouter.get("/students", auth, async (req, res) => {
  res.status(200).json({ message: "Students results ..!" });
});

// Add new student

studentRouter.post("/students", async (req, res) => {});

module.exports = { studentRouter };
