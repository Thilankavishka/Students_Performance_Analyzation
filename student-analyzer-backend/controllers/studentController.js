import Student from "../models/Student.js";
import axios from "axios";

// ➤ Add Student
export const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json({ message: "Student added", data: student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Get All Students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Run Analysis (🔥 Important)
export const runAnalysis = async (req, res) => {
  try {
    const students = await Student.find();

    // Send data to Python
    const response = await axios.post(process.env.PYTHON_API + "/analyze", {
      students,
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
