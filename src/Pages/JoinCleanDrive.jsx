import React from "react";
import { FaHandsHelping } from "react-icons/fa";
import { Link } from "react-router";

const JoinCleanDrive = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-16 px-6 text-center rounded-lg shadow-md mt-12">
      <div className="flex flex-col items-center justify-center">
        <FaHandsHelping className="text-6xl mb-4" />
        <h2 className="text-3xl font-bold mb-3">Join the Clean Drive!</h2>
        <p className="text-lg max-w-2xl mb-6">
          Be a part of our community movement to make neighborhoods cleaner,
          greener, and better for everyone. Your small step can bring a big
          change!
        </p>
        <Link to={'/auth/register'}  className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition">
          Become a Volunteer
        </Link>
      </div>
    </div>
  );
};

export default JoinCleanDrive;
