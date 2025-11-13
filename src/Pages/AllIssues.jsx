import React, { useEffect, useState } from "react";
import IssueCard from "./IssueCard";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Helmet } from "react-helmet";

const categories = [
  "Garbage",
  "Illegal Construction",
  "Broken Public Property",
  "Road Damage",
];

const statuses = ["Ongoing", "Ended"];

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");

  useEffect(() => {
    fetch("https://urban-care-server.vercel.app/all-issues")
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error loading issues:", err));
  }, []);

  // Filter Issues (case-insensitive for safety)
  const filteredIssues = issues.filter((issue) => {
    const matchCategory =
      activeCategory === "All" || issue.category === activeCategory;

    const matchStatus =
      activeStatus === "All" ||
      (issue.status &&
        issue.status.toLowerCase() === activeStatus.toLowerCase());

    return matchCategory && matchStatus;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 my-10 rounded-xl transition-colors">
      <Helmet>
        <title>All Issues | UrbanCare Portal</title>
      </Helmet>

      <div className="bg-white dark:bg-gray-800 px-8 py-6 rounded-xl shadow-md transition-colors">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          All <span className="text-green-600">Issues</span>
        </h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          {/* Category Filter */}
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="category"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Filter by Category
            </label>
            <select
              id="category"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-green-500"
            >
              <option value="All">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="status"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Filter by Status
            </label>
            <select
              id="status"
              value={activeStatus}
              onChange={(e) => setActiveStatus(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-green-500"
            >
              <option value="All">All</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 🔹 Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-300">
              No issues found for this filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllIssues;
