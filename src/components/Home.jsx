import React from "react";
import { Link } from "react-router-dom";
import { FaClipboardCheck } from "react-icons/fa"; // Test icon
import Navbar from "./Navbar"; 

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center flex-grow p-12 text-center">
        <h1 className="text-6xl font-extrabold mb-6 text-purple-400 hover:scale-105 transition-transform duration-300">
          Welcome to the Ultimate Quiz App
        </h1>
        <p className="text-lg text-gray-300 mb-12 max-w-3xl">
          Test your skills and knowledge in programming languages by taking our specialized quizzes.
          Whether you're preparing for an interview or just practicing, we've got you covered!
        </p>
      </header>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-grow p-12">
        <div className="bg-gray-800 p-10 rounded-lg shadow-lg flex flex-col items-center transform hover:scale-105 transition-transform duration-300 hover:bg-gray-700">
          <FaClipboardCheck className="text-8xl text-purple-500 mb-4" />
          <h2 className="text-3xl font-semibold mb-4">Take the Quiz</h2>
          <Link
            to="/test" 
            className="px-8 py-3 text-lg font-semibold text-white bg-purple-600 rounded-full transition duration-300 ease-in-out transform hover:bg-purple-700 hover:scale-110"
          >
            Start Test
          </Link>
        </div>

        {/* Guidelines Section */}
        <div className="mt-12 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4 text-purple-400 hover:underline transition duration-300">
            How to Take the Test
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Choose the quiz, answer the multiple-choice questions, and submit your answers to see your results immediately.
            Make sure to review your answers before submitting. Good luck!
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 p-6 mt-12 shadow-inner">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-white text-sm">&copy; {new Date().getFullYear()} Quiz App. All rights reserved.</p>
          <div className="space-x-4">
            <Link to="/privacy" className="text-sm text-white hover:text-purple-400 transition duration-300">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-white hover:text-purple-400 transition duration-300">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
