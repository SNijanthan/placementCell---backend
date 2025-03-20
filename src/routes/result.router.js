const express = require("express");
const resultRouter = express.Router();

const { auth } = require("../middleware/auth.middleware");

// Get all results (CSV)

resultRouter.post("/results", auth, async (req, res) => {});

// Update student result for an interview

resultRouter.post("/results/:resultID", auth, async (req, res) => {});

module.exports = { resultRouter };
