import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

const IssueCard = ({ issue }) => {
  const { _id, title, category, location, image, amount, status } = issue;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 ">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              status === "ongoing"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {status}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Category: <span className="font-medium">{category}</span>
        </p>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FaMapMarkerAlt className="mr-1 text-green-600" />
          {location}
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm font-semibold text-green-700 dark:text-green-400">
            💰 Budget: ${amount}
          </p>
          <Link to={`/issue/${_id}`} className="px-4 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
