const express = require("express");
const app = express();

const port = 7000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server..!" });
});

app.listen(port, () => {
  console.log(`Server running successfully on port: ${port}`);
});
