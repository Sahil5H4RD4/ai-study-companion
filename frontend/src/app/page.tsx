import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
        Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Smarter</span>, Not Harder
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
        Upload your notes and let our AI instantly generate summaries, flashcards, and personalized study plans to help you ace your exams.
      </p>

      <div className="flex space-x-4 pt-4">
        <Link href="/register" className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition transform hover:scale-105">
          Start Learning Free
        </Link>
        <Link href="/login" className="px-8 py-4 border border-gray-600 rounded-full font-semibold hover:bg-gray-800 transition">
          Log In
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-16 text-left">
        <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl">
          <h3 className="text-xl font-bold mb-2">📄 Smart Summaries</h3>
          <p className="text-gray-400">Upload entire PDFs and let AI extract exactly what you need to know in seconds.</p>
        </div>
        <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl">
          <h3 className="text-xl font-bold mb-2">🧠 Auto-Quizzes</h3>
          <p className="text-gray-400">Instantly generate high-quality MCQs directly from your course materials.</p>
        </div>
        <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl">
          <h3 className="text-xl font-bold mb-2">📅 Adaptive Plans</h3>
          <p className="text-gray-400">Plug in your exam date and get a daily breakdown of what to study and when.</p>
        </div>
      </div>
    </div>
  );
}
