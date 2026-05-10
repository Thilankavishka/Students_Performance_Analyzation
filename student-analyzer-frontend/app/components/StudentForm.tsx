"use client";

import { useState } from "react";
import API from "@/app/services/api";

interface Props {
  refreshStudents: () => void;
}

export default function StudentForm({ refreshStudents }: Props) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    math: "",
    science: "",
    english: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/students", {
        name: formData.name,
        math: Number(formData.math),
        science: Number(formData.science),
        english: Number(formData.english),
      });

      setFormData({
        name: "",
        math: "",
        science: "",
        english: "",
      });

      refreshStudents();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/20 blur-3xl rounded-full"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl rounded-[2rem] p-8 space-y-6"
      >
        {/* Header */}
        <div>
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/20 mb-5">
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
              Student Registration
            </p>
          </div>

          <h2 className="text-4xl font-black text-white">Add New Student</h2>

          <p className="text-gray-400 mt-3 leading-relaxed">
            Enter student academic details to generate AI-powered performance
            analysis.
          </p>
        </div>

        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300 font-semibold">
            Student Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter student name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 p-4 rounded-2xl text-white placeholder:text-gray-500"
            required
          />
        </div>

        {/* Subject Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Math */}
          <div className="space-y-2">
            <label className="text-sm text-blue-300 font-semibold">Math</label>

            <input
              type="number"
              name="math"
              placeholder="0 - 100"
              value={formData.math}
              onChange={handleChange}
              className="w-full bg-blue-500/10 border border-blue-500/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 p-4 rounded-2xl text-white placeholder:text-gray-500"
              required
            />
          </div>

          {/* Science */}
          <div className="space-y-2">
            <label className="text-sm text-green-300 font-semibold">
              Science
            </label>

            <input
              type="number"
              name="science"
              placeholder="0 - 100"
              value={formData.science}
              onChange={handleChange}
              className="w-full bg-green-500/10 border border-green-500/20 focus:border-green-400 focus:ring-2 focus:ring-green-500/20 outline-none transition-all duration-300 p-4 rounded-2xl text-white placeholder:text-gray-500"
              required
            />
          </div>

          {/* English */}
          <div className="space-y-2">
            <label className="text-sm text-yellow-300 font-semibold">
              English
            </label>

            <input
              type="number"
              name="english"
              placeholder="0 - 100"
              value={formData.english}
              onChange={handleChange}
              className="w-full bg-yellow-500/10 border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all duration-300 p-4 rounded-2xl text-white placeholder:text-gray-500"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="group relative overflow-hidden w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 hover:scale-[1.02] transition-all duration-300 text-white py-5 rounded-2xl font-black text-lg shadow-2xl"
        >
          <span className="relative z-10">
            {loading ? "Adding Student..." : "Add Student"}
          </span>

          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </button>
      </form>
    </div>
  );
}
