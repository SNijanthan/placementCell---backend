const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const { connectToDB } = require("./config/database");

const { authRouter } = require("./routes/auth.router");
const { interviewRouter } = require("./routes/interview.router");
const { resultRouter } = require("./routes/result.router");
const { studentRouter } = require("./routes/student.router");

const port = 7000;

const allowedOrigins = [
  "http://localhost:5173", // for local dev
  "https://placement-cell-frontend-chi.vercel.app", // your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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
