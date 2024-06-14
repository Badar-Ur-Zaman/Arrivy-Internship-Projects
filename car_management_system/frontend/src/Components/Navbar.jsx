import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="font-mono absolute top-0 w-full bg-transparent p-4 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-100 text-lg font-bold">
          Car Management System
        </div>
        <div className="hidden md:flex space-x-5 mt-1 text-lg">
          <a href="#home" className="text-gray-100 hover:text-gray-200 hover:border-b-2 border-transparent hover:border-white transition-colors duration-500">Home</a>
          <a href="#cars" className="text-gray-100 hover:text-gray-200 hover:border-b-2 border-transparent hover:border-white transition-colors duration-500">Cars</a>
          <a href="#about" className="text-gray-100 hover:text-gray-200 hover:border-b-2 border-transparent hover:border-white transition-colors duration-500">About</a>
        </div>
        <div className="flex space-x-4">
            <a><Link to="/Login" className="text-gray-100 hover:text-gray-200 hover:border-b-2 border-transparent hover:border-white transition-colors duration-500">Login</Link></a>
            <a><Link to="/Register" className="text-gray-100 hover:text-gray-200 hover:border-b-2 border-transparent hover:border-white transition-colors duration-500">Register</Link></a>
          </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black-100 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <a href="#home" className="block text-black-100 hover:bg-blue-600 hover:text-gray-200 p-2">Home</a>
          <a href="#about" className="block text-black-100 hover:bg-blue-600 hover:text-gray-200 p-2">About</a>
          <a href="#services" className="block text-black-100 hover:bg-blue-600 hover:text-gray-200 p-2">Services</a>
          <a href="#contact" className="block text-black-100 hover:bg-blue-600 hover:text-gray-200 p-2">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
