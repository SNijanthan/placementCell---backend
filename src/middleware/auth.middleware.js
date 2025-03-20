const jwt = require("jsonwebtoken");

const { EmployeeModel } = require("../models/employee.model");

require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Session expired. Please log in again ..!" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await EmployeeModel.findById(decodedToken._id);

    if (!user) {
      return res.status(404).json({ message: "User not exists ..!" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please log in again." });
  }
};

module.exports = { auth };
