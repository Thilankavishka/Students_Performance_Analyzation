import { AnalysisResultType } from "@/app/types/student";

interface Props {
  result: AnalysisResultType | null;
}

export default function AnalysisResult({ result }: Props) {
  if (!result) return null;

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Analysis Results
          </h2>

          <p className="text-gray-400 mt-2">
            AI-powered student performance insights
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-green-500/20 border border-green-500/20">
          <p className="text-green-400 font-semibold">Analysis Complete</p>
        </div>
      </div>

      {/* Average Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/20 p-6 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>

          <p className="text-gray-300 text-sm uppercase tracking-widest">
            Math Average
          </p>

          <h3 className="text-6xl font-black mt-4 text-blue-400">
            {result.average.math}
          </h3>

          <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-400 rounded-full"
              style={{ width: `${result.average.math}%` }}
            ></div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/20 p-6 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 blur-3xl rounded-full"></div>

          <p className="text-gray-300 text-sm uppercase tracking-widest">
            Science Average
          </p>

          <h3 className="text-6xl font-black mt-4 text-green-400">
            {result.average.science}
          </h3>

          <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 rounded-full"
              style={{ width: `${result.average.science}%` }}
            ></div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/20 p-6 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full"></div>

          <p className="text-gray-300 text-sm uppercase tracking-widest">
            English Average
          </p>

          <h3 className="text-6xl font-black mt-4 text-yellow-400">
            {result.average.english}
          </h3>

          <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 rounded-full"
              style={{ width: `${result.average.english}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Predictions */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-3xl font-black">Student Predictions</h3>

            <p className="text-gray-400 mt-1">AI-generated grade predictions</p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/20">
            <p className="text-blue-400 font-semibold">
              {result.predictions.length} Students
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {result.predictions.map((item, index) => (
            <div
              key={index}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all duration-300 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h4 className="text-xl font-bold text-white">{item.name}</h4>

                <p className="text-gray-400 mt-1">
                  Average Score: {item.average}
                </p>
              </div>

              <div
                className={`mt-4 md:mt-0 px-5 py-3 rounded-2xl text-lg font-black shadow-xl
                ${
                  item.grade === "A"
                    ? "bg-green-500/20 text-green-400 border border-green-500/20"
                    : item.grade === "B"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
                      : item.grade === "C"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20"
                        : "bg-red-500/20 text-red-400 border border-red-500/20"
                }`}
              >
                Grade {item.grade}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Student */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"></div>

          <p className="text-gray-300 uppercase tracking-widest text-sm">
            Top Student
          </p>

          <h3 className="text-5xl font-black mt-4 text-purple-400">
            {result.topStudent}
          </h3>

          <p className="text-gray-400 mt-4">
            Highest performing student based on overall average.
          </p>
        </div>

        {/* Insights */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/20 blur-3xl rounded-full"></div>

          <p className="text-gray-300 uppercase tracking-widest text-sm">
            AI Insights
          </p>

          <h3 className="text-2xl font-black mt-4 text-red-400">
            Performance Insight
          </h3>

          <p className="text-gray-300 mt-4 leading-relaxed text-lg">
            {result.insights}
          </p>
        </div>
      </div>
    </div>
  );
}
