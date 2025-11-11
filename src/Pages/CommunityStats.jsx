import React, { useEffect, useState } from "react";
import { FaUsers, FaTools, FaCheckCircle, FaClock } from "react-icons/fa";

const CommunityStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalIssues: 0,
    resolvedIssues: 0,
    pendingIssues: 0,
  });


  useEffect(() => {
    setStats({
      totalUsers: 1234,
      totalIssues: 350,
      resolvedIssues: 210,
      pendingIssues: 140,
    });
  }, []);

  return (
    <div className="bg-gray-100 py-12 my-10 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Community <span className="text-green-600">Impact</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-16">
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
          <FaUsers className="text-blue-500 text-4xl mb-3" />
          <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
          <p className="text-gray-600">Registered Users</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
          <FaTools className="text-green-500 text-4xl mb-3" />
          <h3 className="text-2xl font-bold">{stats.totalIssues}</h3>
          <p className="text-gray-600">Total Issues Reported</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
          <FaCheckCircle className="text-purple-500 text-4xl mb-3" />
          <h3 className="text-2xl font-bold">{stats.resolvedIssues}</h3>
          <p className="text-gray-600">Resolved Issues</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
          <FaClock className="text-orange-500 text-4xl mb-3" />
          <h3 className="text-2xl font-bold">{stats.pendingIssues}</h3>
          <p className="text-gray-600">Pending Issues</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;
