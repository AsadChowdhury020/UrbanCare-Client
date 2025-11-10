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

    fetch("http://localhost:3000/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIssue),
    })
      .then((res) => res.json())
      .then((data) => {
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

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white p-8 rounded-xl shadow-md">
      <Helmet>
        <title>Add Issue | UrbanCare Portal</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Report a New Issue
      </h2>

      <form onSubmit={handleAddIssue} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Issue Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter issue title"
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Category
          </label>
          <select
            name="category"
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select category</option>
            <option value="Garbage">Garbage</option>
            <option value="Illegal Construction">Illegal Construction</option>
            <option value="Broken Public Property">Broken Public Property</option>
            <option value="Road Damage">Road Damage</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="Enter issue location"
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            placeholder="Describe the issue..."
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          ></textarea>
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            placeholder="Paste image URL"
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Suggested Fix Budget ($)
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            value={user?.email || ""}
            readOnly
            className="w-full border border-gray-300 p-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
        >
          Submit Issue
        </button>
      </form>
    </div>
  );
};

export default AddIssue;
