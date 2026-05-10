import { Student } from "@/app/types/student";

interface Props {
  students: Student[];
}

export default function StudentList({ students }: Props) {
  return (
    <div className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl rounded-[2rem] p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/20 mb-4">
              <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
                Student Database
              </p>
            </div>

            <h2 className="text-4xl font-black text-white">Student List</h2>

            <p className="text-gray-400 mt-3">
              Registered student academic records
            </p>
          </div>

          {/* Student Count */}
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 rounded-3xl px-6 py-5 text-center shadow-xl">
            <p className="text-gray-300 text-sm uppercase tracking-widest">
              Total
            </p>

            <h3 className="text-5xl font-black text-cyan-400 mt-2">
              {students.length}
            </h3>
          </div>
        </div>

        {/* Empty State */}
        {students.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
              <span className="text-5xl">📚</span>
            </div>

            <h3 className="text-2xl font-bold text-white">No Students Added</h3>

            <p className="text-gray-400 mt-3">
              Add students to begin AI performance analysis.
            </p>
          </div>
        )}

        {/* Student Cards */}
        <div className="space-y-5">
          {students.map((student, index) => {
            const average =
              (student.math + student.science + student.english) / 3;

            return (
              <div
                key={student._id}
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] shadow-xl"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <div className="relative z-10">
                  {/* Top Section */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    {/* Student Info */}
                    <div className="flex items-center gap-5">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-black text-white shadow-xl">
                        {student.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3 className="text-2xl font-black text-white">
                          {student.name}
                        </h3>

                        <p className="text-gray-400 mt-1">
                          Student #{index + 1}
                        </p>
                      </div>
                    </div>

                    {/* Average */}
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/20 rounded-2xl px-6 py-4 text-center shadow-xl">
                      <p className="text-gray-300 text-xs uppercase tracking-widest">
                        Average
                      </p>

                      <h3 className="text-4xl font-black text-purple-400 mt-2">
                        {average.toFixed(1)}
                      </h3>
                    </div>
                  </div>

                  {/* Subject Scores */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {/* Math */}
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-blue-300 font-semibold">Math</p>

                        <p className="text-2xl font-black text-blue-400">
                          {student.math}
                        </p>
                      </div>

                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-400 rounded-full"
                          style={{
                            width: `${student.math}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Science */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-green-300 font-semibold">Science</p>

                        <p className="text-2xl font-black text-green-400">
                          {student.science}
                        </p>
                      </div>

                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-400 rounded-full"
                          style={{
                            width: `${student.science}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* English */}
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-yellow-300 font-semibold">English</p>

                        <p className="text-2xl font-black text-yellow-400">
                          {student.english}
                        </p>
                      </div>

                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{
                            width: `${student.english}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
