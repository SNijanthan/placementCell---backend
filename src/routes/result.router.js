const express = require("express");
const resultRouter = express.Router();

// Get all results (CSV)

resultRouter.post("/results", async (req, res) => {});

// Update student result for an interview

resultRouter.post("/results/:resultID", async (req, res) => {});

module.exports = { resultRouter };
