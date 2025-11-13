import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Context/AuthContext";
import LoadingSpinner from "../Components/LoadingSpinner";

const AddIssue = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddIssue = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newIssue = {
      title: form.title.value,
      category: form.category.value,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      amount: parseFloat(form.amount.value),
      status: "ongoing",
      date: new Date(),
      email: user?.email,
    };

    fetch("https://urban-care-server.vercel.app/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user?.accessToken}`,
      },
      body: JSON.stringify(newIssue),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You are not allowed to perform this action.",
          });
          setLoading(false);
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setLoading(false);
        if (data.insertedId || data._id) {
          Swal.fire({
            icon: "success",
            title: "Issue added successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire("Error", error.message, "error");
      });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-10 transition-colors">
      <Helmet>
        <title>Add Issue | UrbanCare Portal</title>
      </Helmet>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-3xl transition-colors">
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6 text-center">
          Report a New Issue
        </h2>

        <form
          onSubmit={handleAddIssue}
          className="space-y-4 flex flex-col items-center"
        >
          {/* Issue Title */}
          <div className="w-3/4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Issue Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter issue title"
              required
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-transparent dark:bg-gray-700 dark:text-white focus:outline-green-500"
            />
          </div>

          {/* Category */}
          <div className="w-3/4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Category
            </label>
            <select
              name="category"
              required
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-transparent dark:bg-gray-700 dark:text-white focus:outline-green-500"
            >
              <option value="">Select category</option>
              <option value="Garbage">Garbage</option>
              <option value="Illegal Construction">Illegal Construction</option>
              <option value="Broken Public Property">
                Broken Public Property
              </option>
              <option value="Road Damage">Road Damage</option>
            </select>
          </div>

          {/* Location */}
          <div className="w-3/4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              required
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-transparent dark:bg-gray-700 dark:text-white focus:outline-green-500"
            />
          </div>

          {/* Description */}
          <div className="w-3/4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Describe the issue"
              required
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-transparent dark:bg-gray-700 dark:text-white focus:outline-green-500"
            />
          </div>

          {/* Image URL */}
          <div className="w-3/4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              placeholder="Enter image URL"
              required
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-transparent dark:bg-gray-700 dark:text-white focus:outline-green-500"
            />
          </div>

          {/* Amount */}
          <div className="w-3/4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Suggested Fix Budget ($)
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter estimated budget"
              required
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-transparent dark:bg-gray-700 dark:text-white focus:outline-green-500"
            />
          </div>

          {/* Email (Read-Only) */}
          <div className="w-3/4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <div className="w-3/4">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
            >
              Submit Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIssue;
