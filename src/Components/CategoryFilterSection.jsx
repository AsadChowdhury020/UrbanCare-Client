import React, { useState, useEffect } from "react";
import IssueCard from "../Pages/IssueCard";
import LoadingSpinner from "./LoadingSpinner";

const categories = [
  "Garbage",
  "Illegal Construction",
  "Broken Public Property",
  "Road Damage",
];

const CategoryFilterSection = () => {
  const [issues, setIssues] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch issues from backend
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch("http://localhost:3000/issues"); 
        const data = await res.json();
        const formattedData = data.map(issue => ({
          ...issue,
          date: new Date(issue.date)
        }));

        setIssues(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching issues:", error);
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const filteredIssues =
    activeCategory === "All"
      ? issues
      : issues.filter(issue => issue.category === activeCategory);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <div className="my-10 px-4">
      {/* Category Buttons */}
      <div className="flex justify-center gap-5 mb-10 flex-wrap">
        <button
          className={`px-4 py-2 rounded ${
            activeCategory === "All"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveCategory("All")}
        >
          All Issues
        </button>

        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              activeCategory === category
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Issues Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredIssues.length > 0 ? (
          filteredIssues.map(issue => ( <IssueCard issue={issue}></IssueCard>))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No issues found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryFilterSection;
