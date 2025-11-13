import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import IssueCard from "./IssueCard";
import { Helmet } from "react-helmet";

const RecentIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://urban-care-server.vercel.app/recent-issues")
      .then((response) => response.json())
      .then((data) => {
        setIssues(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen px-5 py-10 transition-all rounded-xl">
      <Helmet>
        <title>Recent Issues | UrbanCare Portal</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
          Recent <span className="text-green-600">Issues</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentIssues;
