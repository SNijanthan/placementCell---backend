const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const { connectToDB } = require("./config/database");

const port = 7000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server..!" });
});

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
