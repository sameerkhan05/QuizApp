import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAction } from "../redux/question_reducer";
import { resetResultAction } from "../redux/result_reducer";
import {
  attempts_Number,
  earnPoints_Number,
  getServerData,
} from "../helper/helper";
import { usePublishResult } from "../hooks/setResult";

const Result = () => {
  const dispatch = useDispatch();
  const [savedResults, setSavedResults] = useState([]);
  const [hasPublished, setHasPublished] = useState(false);

  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

  // Fetch saved results from the server 
  useEffect(() => {
    const fetchSavedResults = async () => {
      try {
        const data = await getServerData(
          `${import.meta.env.VITE_APP_SERVER_HOSTNAME}/api/result`,
          (data) => data
        );
        setSavedResults(data);
      } catch (error) {
        console.log("Error fetching saved results:", error);
      }
    };

    fetchSavedResults();
  }, []);

  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const passed = earnPoints >= queue.length * 5;

  // Save result after the test is completed
  useEffect(() => {
    const publishResult = async () => {
      if (result && !hasPublished) {
        try {
          // Publish the result
          await usePublishResult({
            result,
            username: userId,
            attempts,
            points: earnPoints,
            achived: passed ? "Passed" : "Failed",
          });

          // Create the new result 
          const newResult = {
            username: userId,
            attempts,
            points: earnPoints,
            achived: passed ? "Passed" : "Failed",
          };

          setSavedResults((prevResults) => [newResult, ...prevResults]);

          setHasPublished(true);
        } catch (error) {
          console.error("Error publishing result:", error);
        }
      }
    };

    publishResult();
  }, [result, userId, attempts, earnPoints, passed, hasPublished]);
  const totalPoints = queue.length * 10;
  const totalQuestions = queue.length;

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
    setHasPublished(false);
    setSavedResults([]); // Optional: Clear results on restart if desired
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-8 py-8">
        <h1 className="text-4xl font-bold text-purple-400 mb-6 text-center">
          Quiz Results
        </h1>

        {/* Results Summary */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-center mb-4">Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-purple-600 rounded-lg">
              <p className="text-lg">Total Points:</p>
              <p className="text-3xl font-bold">{totalPoints}</p>
            </div>
            <div className="p-4 bg-purple-600 rounded-lg">
              <p className="text-lg">Total Attempts:</p>
              <p className="text-3xl font-bold">{attempts}</p>
            </div>
            <div className="p-4 bg-purple-600 rounded-lg">
              <p className="text-lg">Total Questions:</p>
              <p className="text-3xl font-bold">{totalQuestions}</p>
            </div>
            <div
              className={`p-4 rounded-lg ${
                passed ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <p className="text-lg">Status:</p>
              <p className="text-3xl font-bold">
                {passed ? "Passed" : "Failed"}
              </p>
            </div>
          </div>
        </div>

        {/* Display Total Earned Points Once */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 text-center">
          <p className="text-lg font-semibold">Total Earned Points:</p>
          <p className="text-3xl font-bold text-purple-400">{earnPoints}</p>
        </div>

        {/* Table for Saved Results from the Database */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Saved Results
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left text-lg font-semibold">
                    Username
                  </th>
                  <th className="py-3 px-6 text-left text-lg font-semibold">
                    Attempts
                  </th>
                  <th className="py-3 px-6 text-left text-lg font-semibold">
                    Points
                  </th>
                  <th className="py-3 px-6 text-left text-lg font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {savedResults.length > 0 ? (
                  savedResults.map((result, index) => (
                    <tr
                      key={index}
                      className="bg-gray-700 hover:bg-gray-600 transition-colors duration-300"
                    >
                      <td className="py-3 px-6 border-b border-gray-600">
                        {result.username || "N/A"}
                      </td>
                      <td className="py-3 px-6 border-b border-gray-600">
                        {result.attempts || "N/A"}
                      </td>
                      <td className="py-3 px-6 border-b border-gray-600">
                        {result.points || "N/A"}
                      </td>
                      <td
                        className={`py-3 px-6 border-b border-gray-600 font-bold ${
                          result.achived === "Passed"
                            ? "text-green-400 hover:text-green-600"
                            : "text-red-400 hover:text-red-600"
                        } transition-colors duration-300`}
                      >
                        {result.achived || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-3 px-6 text-center text-gray-400"
                    >
                      No saved results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-6 text-center">
          <Link
            to="/test"
            onClick={onRestart}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
          >
            Reset Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
