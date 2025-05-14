import React from "react";
import Header from "@/components/custom/Header";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 top-40 right-10"></div>
      <div className="absolute w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-10 left-1/2 transform -translate-x-1/2"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center mt-20">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight animate-fade-in-down">
          Build Your Resume <span className="text-purple-600">with AI</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto animate-fade-in-up">
          Craft stunning resumes in seconds with smart AI assistance and
          beautiful templates.
        </p>

        <div className="mt-10 animate-fade-in-up">
          <Link
            to="/dashboard"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full shadow-lg transition-all duration-300"
          >
            Get Started →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-sm text-gray-400 z-10">
        © {new Date().getFullYear()} AI Resume Builder
      </div>
    </div>
  );
}

export default Home;
