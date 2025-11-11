import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import LoadingSpinner from "../Components/LoadingSpinner";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Helmet } from "react-helmet";

const IssueDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const contributionModalRef = useRef(null);
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/issues/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIssue(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));

    fetch(`http://localhost:3000/contributions?issueId=${id}`)
      .then((res) => res.json())
      .then((data) => setContributors(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleContribution = (e) => {
    e.preventDefault();
    const form = e.target;
    const contribution = {
      issueId: id,
      issueTitle: issue.title,
      amount: parseFloat(form.amount.value),
      name: form.name.value,
      email: user?.email,
      phone: form.phone.value,
      address: form.address.value,
      date: new Date(),
      additionalInfo: form.info.value,
    };

    fetch("http://localhost:3000/contributions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contribution),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Thank you for your contribution!",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        contributionModalRef.current.close();
        setContributors((prev) => [...prev, contribution]);
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  const handleContributionsModalOpen = () => {
    contributionModalRef.current.showModal();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 my-10 px-5 py-5 rounded-xl transition-colors">
      <Helmet>
        <title>Issue Details | UrbanCare Portal</title>
      </Helmet>

      {/* Issue Details Card */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors">
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">
            {issue.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Category:</strong> {issue.category} |{" "}
            <strong>Location:</strong> {issue.location}
          </p>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            {issue.description}
          </p>
          <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            Suggested Fix Budget:{" "}
            <span className="text-green-600">${issue.amount}</span>
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Date Reported: {new Date(issue.date).toLocaleDateString("en-GB")}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center gap-2 transition"
            >
              <IoMdArrowRoundBack />
              Back
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
              onClick={handleContributionsModalOpen}
            >
              Pay Clean-Up Contribution
            </button>
          </div>
        </div>
      </div>

      {/* Contribution Modal */}
      <dialog
        id="payModal"
        className="modal"
        ref={contributionModalRef}
      >
        <div className="modal-box max-w-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-lg transition-colors">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
              ✕
            </button>
          </form>

          <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
            Pay Clean-Up Contribution
          </h3>

          <form onSubmit={handleContribution} className="space-y-3">
            <input
              type="text"
              name="title"
              value={issue.title}
              disabled
              className="w-full border p-2 rounded-md bg-gray-100 dark:bg-gray-700"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount ($)"
              required
              className="w-full border p-2 rounded-md bg-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              defaultValue={user?.displayName}
              required
              className="w-full border p-2 rounded-md bg-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              defaultValue={user?.email}
              disabled
              className="w-full border p-2 rounded-md bg-gray-100 dark:bg-gray-700"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full border p-2 rounded-md bg-transparent dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              className="w-full border p-2 rounded-md bg-transparent dark:bg-gray-700 dark:text-white"
            />
            <textarea
              name="info"
              placeholder="Additional Info (optional)"
              className="w-full border p-2 rounded-md bg-transparent dark:bg-gray-700 dark:text-white"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
            >
              Submit Contribution
            </button>
          </form>
        </div>
      </dialog>

      {/* Contributors Table */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl mt-10 p-6 overflow-x-auto border border-gray-200 dark:border-gray-700 transition-colors">
        <h3 className="text-3xl font-semibold mb-4 text-green-700 dark:text-green-400">
          Contributors
        </h3>
        {contributors.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No contributions yet.
          </p>
        ) : (
          <table className="table w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead className="bg-green-100 dark:bg-green-900 text-gray-800 dark:text-gray-100">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {contributors.map((c, i) => (
                <tr key={i} className="text-gray-800 dark:text-gray-200">
                  <td>{i + 1}</td>
                  <td>{c.name}</td>
                  <td>${c.amount}</td>
                  <td>{new Date(c.date).toLocaleDateString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default IssueDetails;

