"use client";

import { useEffect, useMemo, useState } from "react";

import API from "@/app/services/api";

import StudentForm from "@/app/components/StudentForm";
import StudentList from "@/app/components/StudentList";
import AnalysisResult from "@/app/components/AnalysisResult";

import { Student, AnalysisResultType } from "@/app/types/student";

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [result, setResult] = useState<AnalysisResultType | null>(null);

  const [loading, setLoading] = useState(false);

  /* Search + Pagination */
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data);
  };

  const runAnalysis = async () => {
    try {
      setLoading(true);

      const res = await API.post("/analysis/run");

      setResult(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* Filter Students */
  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [students, search]);

  /* Pagination */
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage,
  );

  return (
    <main className="min-h-screen bg-[#030712] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 p-8">
        {/* ================= HEADER ================= */}
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-7 mb-8">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
            {/* Left */}
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
                  AI STUDENT ANALYTICS PLATFORM
                </p>
              </div>

              <h1 className="text-4xl xl:text-5xl font-black leading-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Student Performance Dashboard
              </h1>

              <p className="text-gray-400 text-base mt-4 max-w-2xl">
                Fullstack analytics system powered by Next.js, Node.js, MongoDB,
                and Python workflow engine.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col md:flex-row gap-5">
              {/* Students Count */}
              <div className="bg-white/5 border border-white/10 rounded-[1.8rem] px-8 py-5 min-w-[190px]">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Total Students
                </p>

                <h2 className="text-5xl font-black text-cyan-400 mt-2">
                  {students.length}
                </h2>
              </div>

              {/* Analysis Button */}
              <button
                onClick={runAnalysis}
                disabled={loading}
                className="group relative overflow-hidden rounded-[1.8rem] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-10 py-5 text-lg font-black shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">
                  {loading ? "Analyzing..." : "Run AI Analysis"}
                </span>

                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8 mb-10 items-start">
          {/* LEFT - FORM */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-6 shadow-2xl sticky top-8">
            <StudentForm refreshStudents={fetchStudents} />
          </div>

          {/* RIGHT - STUDENT DATABASE */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-6 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
              <div>
                <h2 className="text-4xl font-black">Student Database</h2>

                <p className="text-gray-400 mt-2">
                  Search and manage student records
                </p>
              </div>

              {/* Search */}
              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-white/5 border border-white/10 focus:border-cyan-500 outline-none px-5 py-4 rounded-2xl text-white w-full md:w-[320px]"
              />
            </div>

            {/* Student List */}
            <StudentList students={paginatedStudents} />

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 disabled:opacity-40"
              >
                Previous
              </button>

              <div className="px-5 py-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 font-bold">
                {currentPage} / {totalPages || 1}
              </div>

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* ================= ANALYSIS SECTION ================= */}
        <div className="rounded-[3rem] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-10 shadow-2xl min-h-[800px]">
          {result ? (
            <AnalysisResult result={result} />
          ) : (
            <div className="min-h-[700px] flex items-center justify-center">
              <div className="text-center max-w-3xl">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 flex items-center justify-center mx-auto mb-10">
                  <span className="text-8xl">🤖</span>
                </div>

                <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  AI Analysis Ready
                </h2>

                <p className="text-gray-400 text-2xl leading-relaxed">
                  Add students and run AI analysis to generate intelligent
                  predictions, performance insights, and academic analytics.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
