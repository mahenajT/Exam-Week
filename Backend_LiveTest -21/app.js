const express = require("express");
const mongoose = require("mongoose");

const router = require("./routes/route");

const app = express();
const PORT = 3000;

app.use(express.json());

const DB_URI =
  "mongodb+srv://nasrin:nasrin1024@mernbatch-6.zsj87.mongodb.net/Backend_Exam_21";

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on${PORT}`);
});
