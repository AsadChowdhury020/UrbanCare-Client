import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Helmet } from "react-helmet";
// import jsPDF from "jspdf";
// import { autoTable } from 'jspdf-autotable';
// import autoTable from "jspdf-autotable";

const MyContributions = () => {
  const { user } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://urban-care-server.vercel.app/contributions?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setContributions(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading contributions:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  // const handleDownloadPDF = () => {
  //   const doc = new jsPDF();
  //   doc.setFontSize(16);
  //   doc.text("UrbanCare - Contribution Summary Report", 14, 20);
  //   doc.setFontSize(12);
  //   doc.text(`Contributor: ${user?.displayName || "N/A"}`, 14, 30);
  //   doc.text(`Email: ${user?.email}`, 14, 38);
  //   doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 46);

  //   const tableData = contributions.map((c) => [
  //     c.issueTitle || "N/A",
  //     c.address || "N/A",
  //     `$${c.amount || 0}`,
  //     new Date(c.date).toLocaleDateString(),
  //   ]);

  //   autoTable(doc, {
  //     startY: 55,
  //     head: [["Issue Title", "Address", "Amount", "Date"]],
  //     body: tableData,
  //   });

  //   doc.save(`UrbanCare_Contributions_${user?.displayName || "User"}.pdf`);
  // };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10 transition-all rounded-xl">
      <Helmet>
        <title>My Contributions | UrbanCare Portal</title>
      </Helmet>

      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            My <span className="text-green-600">Contributions</span>
          </h2>
          {contributions.length > 0 && (
            <button
              // onClick={handleDownloadPDF}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
            >
              Download Report
            </button>
          )}
        </div>

        {contributions.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            You haven’t made any contributions yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Issue Title</th>
                  <th className="py-3 px-4 text-left">Address</th>
                  <th className="py-3 px-4 text-center">Amount</th>
                  <th className="py-3 px-4 text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((c) => (
                  <tr
                    key={c._id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                      <img src={c.image} alt="" /> {c.issueTitle}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {c.address}
                    </td>
                    <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-medium">
                      ${c.amount}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">
                      {new Date(c.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContributions;
