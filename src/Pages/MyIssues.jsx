// import React from 'react';

// const MyIssues = () => {
//     return (
//         <div>
//             My Issues
//         </div>
//     );
// };

// export default MyIssues;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import LoadingSpinner from "../Components/LoadingSpinner";
import IssueCard from "./IssueCard";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const [myIssues, setMyIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/issues?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyIssues(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading user issues:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        My <span className="text-green-600">Issues</span>
      </h2>

      {myIssues.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven't reported any issues yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myIssues.map((issue) => (
            <IssueCard key={issue._id || issue.title} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIssues;
