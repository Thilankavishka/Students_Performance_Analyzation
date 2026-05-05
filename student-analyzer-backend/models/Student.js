import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    math: { type: Number, required: true },
    science: { type: Number, required: true },
    english: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Student", studentSchema);
