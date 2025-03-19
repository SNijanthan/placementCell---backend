const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { validateSignUpUser } = require("../utils/validator");
const { EmployeeModel } = require("../models/employee.model");

// Employee signup

authRouter.post("/auth/signup", async (req, res) => {
  try {
    validateSignUpUser(req);

    const { email, password } = req.body;

    // Hashing password

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new EmployeeModel({
      email,
      password: hashPassword,
    });

    await user.save();

    res.status(201).json({ message: "Employee added successfully", user });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.message}` });
  }
});

// Employee login

authRouter.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await EmployeeModel.findOne({ email });

    // Find user & verify password in one step (prevents user enumeration)

    const isPasswordValid = existingUser
      ? await bcrypt.compare(password, existingUser.password)
      : false;

    if (!existingUser || !isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token

    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Attach token to a secure cookie

    res
      .cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      .status(200)
      .json({ message: "Loggedin successfully" });
  } catch (error) {
    res.status(401).json({ message: `ERROR: ${error.message}` });
  }
});

module.exports = { authRouter };
