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
    <div className="py-12 my-10 rounded-xl bg-gray-100 dark:bg-gray-800 transition-colors">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
        Community <span className="text-green-600">Impact</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-16">
        {[
          {
            icon: <FaUsers />,
            value: stats.totalUsers,
            label: "Registered Users",
            color: "text-blue-500",
          },
          {
            icon: <FaTools />,
            value: stats.totalIssues,
            label: "Total Issues Reported",
            color: "text-green-500",
          },
          {
            icon: <FaCheckCircle />,
            value: stats.resolvedIssues,
            label: "Resolved Issues",
            color: "text-purple-500",
          },
          {
            icon: <FaClock />,
            value: stats.pendingIssues,
            label: "Pending Issues",
            color: "text-orange-500",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-700 shadow-md rounded-xl p-6 flex flex-col items-center transition-colors"
          >
            <div className={`${item.color} text-4xl mb-3`}>{item.icon}</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {item.value}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityStats;
