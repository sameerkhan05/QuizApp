import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-400 hover:scale-105 transition-transform duration-300">QuizWizz💡</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-lg text-white hover:text-purple-400 transition duration-300">Home</Link>
          <Link to="/article" className="text-lg text-white hover:text-purple-400 transition duration-300">Article</Link>
          <Link to="/result-page" className="text-lg text-white hover:text-purple-400 transition duration-300">Results</Link>
        </div>

        {/*  Menu Button for Mobile */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Links */}
      <div
        className={`md:hidden mt-4 space-y-2 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "max-h-40 opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-0"
        } overflow-hidden origin-top`}
      >
        <Link to="/" className="block text-lg text-white hover:text-purple-400 transition duration-300">Home</Link>
        <Link to="/article" className="block text-lg text-white hover:text-purple-400 transition duration-300">Article</Link>
        <Link to="/result-page" className="block text-lg text-white hover:text-purple-400 transition duration-300">Resuts</Link>
      </div>
    </nav>
  );
};

export default Navbar;
