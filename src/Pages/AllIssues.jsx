import React, { useEffect, useState } from "react";
import IssueCard from "./IssueCard";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Helmet } from "react-helmet";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/issues")
      .then((response) => response.json())
      .then((data) => {
        setIssues(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-100 my-10">
      <Helmet>
        <title>All Issues | UrbanCare Portal</title>
      </Helmet>

      <div className="bg-white px-8 py-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          All <span className="text-green-600">Issues</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllIssues;
