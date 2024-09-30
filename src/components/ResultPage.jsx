import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); 

  // Fetch results data from the server
  const fetchResults = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_HOSTNAME}/api/result`
      );
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  if (loading)
    return <div className="text-white text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;

  // Filter results 
  const filteredResults = results.filter((result) => {
    if (filter === "Passed") return result.achived === "Passed";
    if (filter === "Failed") return result.achived === "Failed";
    return true; // Return all results 
  }).filter(result => 
    result.username.toLowerCase().includes(searchTerm.toLowerCase())
  ); 

  // Download PDF function
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    
    // Adding title with custom styling
    doc.text("Results Overview", 14, 10);
    doc.setFontSize(12);
    doc.text("This document contains the results overview for the candidates.", 14, 20);

    
    const columns = [
      { title: "Username", dataKey: "username" },
      { title: "Attempts", dataKey: "attempts" },
      { title: "Points", dataKey: "points" },
      { title: "Status", dataKey: "achived" },
    ];

   
    const data = filteredResults.map(result => ({
      username: result.username || "N/A",
      attempts: result.attempts || "N/A",
      points: result.points || "N/A",
      achived: result.achived || "N/A",
    }));

   
    doc.autoTable({
      columns: columns,
      body: data,
      startY: 30,
      theme: "grid",
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: 3,
        overflow: "linebreak",
        rowHeight: 10,
        lineColor: [44, 62, 80],
        fillColor: [240, 240, 240],
      },
      headStyles: {
        fillColor: [52, 73, 94],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      margin: { top: 30 },
    });

    
    doc.save("results_overview.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white">
      <Navbar />
      <div className="px-4 sm:px-8 lg:px-16 py-12">
        
        <h1 className="text-5xl font-extrabold text-center text-purple-300 mb-8 transition-transform transform hover:scale-105 hover:text-purple-400">
          <span className="border-b-4 border-purple-600">Results</span> Overview
        </h1>

        
        <div className="flex justify-center items-center mb-4 space-x-4">
          <input
            type="text"
            placeholder="Search by Username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded-lg p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent hover:bg-gray-700 hover:shadow-lg"
          />
          <label htmlFor="filter" className="text-purple-300">
            Filter by Status:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded-lg p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent hover:bg-gray-700 hover:shadow-lg"
          >
            <option value="All">All</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
          </select>
          {/* PDF Button */}
          <button
            onClick={downloadPDF}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Download Results
          </button>
        </div>

        {/* Table for Saved Results from the Database */}
        <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-2xl mb-10">
          <h2 className="text-3xl font-semibold text-center text-purple-400 mb-6 transition-colors duration-300 hover:text-purple-300">
            Your Saved Results
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 rounded-lg">
              <thead className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700">
                <tr>
                  <th className="py-4 px-6 text-left text-lg font-semibold tracking-wide text-white">
                    Username
                  </th>
                  <th className="py-4 px-6 text-left text-lg font-semibold tracking-wide text-white">
                    Attempts
                  </th>
                  <th className="py-4 px-6 text-left text-lg font-semibold tracking-wide text-white">
                    Points
                  </th>
                  <th className="py-4 px-6 text-left text-lg font-semibold tracking-wide text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.length > 0 ? (
                  filteredResults.map((result, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-purple-600 transition-colors duration-300 hover:shadow-lg ${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                      }`}
                    >
                      <td className="py-4 px-6 border-b border-gray-600 transition-colors duration-300 hover:text-purple-300">
                        {result.username || "N/A"}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-600 transition-colors duration-300 hover:text-purple-300">
                        {result.attempts || "N/A"}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-600 transition-colors duration-300 hover:text-purple-300">
                        {result.points || "N/A"}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-600">
                        <span
                          className={`px-3 py-1 rounded-full font-bold text-sm transition-transform transform hover:scale-110 ${
                            result.achived === "Passed"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {result.achived || "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-6 px-4 text-center text-gray-400 bg-gray-700 border-gray-600"
                    >
                      No saved results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
