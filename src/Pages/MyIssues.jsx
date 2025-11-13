import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import LoadingSpinner from "../Components/LoadingSpinner";
import MyIssueCard from "./MyIssueCard";
import { Helmet } from "react-helmet";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const [myIssues, setMyIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = () => {
    if (user?.email) {
      // fetch(`https://urban-care-server.vercel.app/issues?email=${user.email}`)
      fetch(`https://urban-care-server.vercel.app/issues?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      })
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
  };

  useEffect(() => {
    fetchIssues();
  }, [user?.email]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="px-4 py-10 rounded-xl bg-gray-100 dark:bg-gray-900 transition-colors">
      <Helmet>
        <title>My Issues | UrbanCare Portal</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        My <span className="text-green-600">Issues</span>
      </h2>

      {myIssues.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven’t reported any issues yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myIssues.map((issue) => (
            <MyIssueCard
              key={issue._id}
              issue={issue}
              refreshIssues={fetchIssues}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIssues;
