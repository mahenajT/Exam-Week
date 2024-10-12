import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes/api.js";
import fileRouter from "./routes/file_api.js";

import {
  PORT,
  DATABASE,
  MAX_JSON_SIZE,
  REQUEST_NUMBER,
  REQUEST_TIME,
  URL_ENCODE,
  WEB_CACHE,
} from "./configs/configs.js";
const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));

// Default middleware
const limiter = rateLimit({
  windowMs: REQUEST_TIME,
  max: REQUEST_NUMBER,
});
app.use(limiter);

// Cache
app.set("etag", WEB_CACHE);

// DataBase
mongoose
  .connect(DATABASE, { autoIndex: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed: " + error.toString());
  });

// Router
app.use("/api", router);
app.use(fileRouter);

// Listening
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
