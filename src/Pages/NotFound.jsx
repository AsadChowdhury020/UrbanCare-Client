import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all">
      <h1 className="text-7xl font-extrabold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! Page Not Found</p>
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-all"
      >
        <IoMdArrowRoundBack size={22} /> Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
