const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const { connectToDB } = require("./config/database");

const { authRouter } = require("./routes/auth.router");
const { interviewRouter } = require("./routes/interview.router");
const { resultRouter } = require("./routes/result.router");
const { studentRouter } = require("./routes/student.router");

const port = 7000;

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", interviewRouter);
app.use("/", resultRouter);
app.use("/", studentRouter);

connectToDB()
  .then(() => {
    console.log("Connected to database successfully");
    app.listen(port, () => {
      console.log(`Server running successfully on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error(`DB connection failed: ${err.message}`);
  });
