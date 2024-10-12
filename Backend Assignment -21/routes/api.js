import express from "express";
const router = express.Router();
import * as studentController from "../app/controllers/student_controller.js";
import authMiddleware from "../app/middlewares/auth.js";
router.post("/Registration", studentController.Registration);
router.post("/Login", studentController.Login);
router.get("/ProfileRead", authMiddleware, studentController.ProfileRead);
router.put("/ProfileUpdate", authMiddleware, studentController.ProfileUpdate);

export default router;
