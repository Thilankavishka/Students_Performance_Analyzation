import express from "express";
import {
  addStudent,
  getStudents,
  runAnalysis,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/students", addStudent);
router.get("/students", getStudents);
router.post("/analysis/run", runAnalysis);

export default router;
