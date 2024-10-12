import express from "express";
import multer from "multer";
import * as fileController from "../app/controllers/file_controller.js";

import authMiddleware from "../app/middlewares/auth.js";

const router = express.Router();

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (request, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// File upload routes
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  fileController.fileUpload
);
router.get("/read/:filename", authMiddleware, fileController.fileRead);
router.delete("/delete/:filename", authMiddleware, fileController.fileDelete);

export default router;
