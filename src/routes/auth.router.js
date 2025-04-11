const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { validateSignUpUser, validateLogInUser } = require("../utils/validator");
const { EmployeeModel } = require("../models/employee.model");
const { auth } = require("../middleware/auth.middleware");

// Employee signup

authRouter.post("/auth/signup", async (req, res) => {
  try {
    validateSignUpUser(req);

    const { email, password } = req.body;

    const existingUserDetails = await EmployeeModel.findOne({ email });

    if (existingUserDetails) {
      throw new Error("Email already exists. Please try other email");
    }

    // Hashing password

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new EmployeeModel({
      email,
      password: hashPassword,
    });

    await user.save();

    res.status(201).json({ message: "User added successfully", user });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.message}` });
  }
});

// Employee login

authRouter.post("/auth/login", async (req, res) => {
  try {
    validateLogInUser(req);
    const { email, password } = req.body;

    const existingUser = await EmployeeModel.findOne({ email });

    // Find user & verify password in one step (prevents user enumeration)

    const isPasswordValid = existingUser
      ? await bcrypt.compare(password, existingUser.password)
      : false;

    if (!existingUser || !isPasswordValid) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // Generate JWT token

    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Attach token to a secure cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // ✅ required for HTTPS
        sameSite: "None", // ✅ allows cross-site cookies
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Loggedin successfully", existingUser });
  } catch (error) {
    res.status(401).json({ message: `ERROR: ${error.message}` });
  }
});

authRouter.get("/view-profile", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const user = await EmployeeModel.findOne({ email: loggedInUser.email });
    if (!user) {
      return res.status(200).json({ message: "No user found" });
    }
    res
      .status(200)
      .json({ message: "User profile retrieved successfully", user });
  } catch (error) {
    res.status(401).json({ message: `ERROR: ${error.message}` });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res
      .cookie("token", null, {
        httpOnly: true,
        secure: true, // ✅ Important for HTTPS
        sameSite: "None", // ✅ Needed for cross-domain
        expires: new Date(0), // ✅ Expire immediately
      })
      .status(200)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(401).json({ message: `ERROR: ${error.message}` });
  }
});

module.exports = { authRouter };
