import React, { useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserId } from "../redux/result_reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hero = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function startQuiz() {
    const userId = inputRef.current?.value;

    if (userId) {
      dispatch(setUserId(userId));
      navigate("/quiz");
    } else {
      toast.error("Please enter your email ID before starting the quiz.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        className: "toast-error",
      });
    }
  }

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-gradient-to-b from-gray-800 via-purple-900 to-black overflow-hidden text-white">
      <div className="p-8 rounded-lg shadow-lg bg-gray-800 bg-opacity-90 z-10">
        {/* Animated Title */}
        <h1 className="title text-center text-6xl font-extrabold text-purple-400 mb-6">
          Quiz Wizz
        </h1>

        <div className="flex justify-center mb-4">
          <p className="text-2xl text-gray-200 animate-glow">
            Unlock Your Knowledge!
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <ol className="space-y-4 text-lg lg:text-xl text-gray-200">
            <div className="flex items-start">
              <FaCheckCircle className="text-purple-400 mr-3 mt-1" />
              <li className="list-none">
                You will be asked 10 questions, one after another.
              </li>
            </div>
            <div className="flex items-start">
              <FaCheckCircle className="text-purple-400 mr-3 mt-1" />
              <li className="list-none">
                Please note that the entire test has a total duration of 1
                minute.
              </li>
            </div>
            <div className="flex items-start">
              <FaCheckCircle className="text-purple-400 mr-3 mt-1" />
              <li className="list-none">
                You can change your answer by going back to the previous
                question.
              </li>
            </div>
            <div className="flex items-start">
              <FaCheckCircle className="text-purple-400 mr-3 mt-1" />
              <li className="list-none">
                Each correct answer gives you 10 points. Aim for a perfect
                score!
              </li>
            </div>
            <div className="flex items-start">
              <FaCheckCircle className="text-purple-400 mr-3 mt-1" />
              <li className="list-none">
                Check your score on the results page after completing the quiz.
              </li>
            </div>
          </ol>
        </div>

        <form id="form" className="mt-6 flex justify-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter email id*"
            className="w-full md:w-1/2 px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-gray-200"
          />
        </form>

        {/* Start Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={startQuiz}
            className="px-8 py-3 text-lg font-semibold text-white bg-purple-600 rounded-full transition duration-300 ease-in-out transform hover:bg-purple-700 hover:scale-105 focus:outline-none"
          >
            Start Quiz
          </button>
        </div>
      </div>

      {/* Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-r from-purple-600 to-purple-300 animate-bg"></div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* CSS Animation Styles */}
      <style>{`
        @keyframes slide-top {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes title-animate {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        @keyframes glow {
          0% {
            text-shadow: 0 0 10px rgba(128, 0, 128, 1);
          }
          50% {
            text-shadow: 0 0 20px rgba(128, 0, 128, 0.7), 0 0 30px rgba(128, 0, 128, 0.5);
          }
          100% {
            text-shadow: 0 0 10px rgba(128, 0, 128, 1);
          }
        }
        @keyframes background-animation {
          0% {
            opacity: 0.1;
          }
          100% {
            opacity: 0.3;
          }
        }
        .animate-title {
          animation: title-animate 1.5s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 1.5s ease-in-out infinite;
        }
        .animate-bg {
          animation: background-animation 4s ease-in-out infinite alternate;
        }
        .toast-error {
          background-color: white; /* White background for error toast */
          color: black; /* Black text for better contrast */
          font-weight: bold; /* Bold text for emphasis */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for a classy look */
          border-radius: 8px; /* Rounded corners for style */
        }
      `}</style>
    </div>
  );
};

export default Hero;
