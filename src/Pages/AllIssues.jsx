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

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3000/issues")
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
        setLoading(false);
      });
  }, []);

  const filteredIssues =
    activeCategory === "All"
      ? issues
      : issues.filter((issue) => issue.category === activeCategory);

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

        {/* Category Filter Buttons */}
        <div className="flex justify-center gap-3 flex-wrap mb-6">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded font-medium transition ${
              activeCategory === "All"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded font-medium transition ${
                activeCategory === cat
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-300">
              No issues found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllIssues;
