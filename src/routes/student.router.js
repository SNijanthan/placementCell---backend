const express = require("express");
const studentRouter = express.Router();

// Get all students

studentRouter.get("/students", async (req, res) => {});

// Add new student

studentRouter.post("/students", async (req, res) => {});

module.exports = { studentRouter };
