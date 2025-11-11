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
      headers: { "Content-Type": "application/json" },
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
          {[
            { label: "Issue Title", name: "title", type: "text" },
            { label: "Location", name: "location", type: "text" },
            { label: "Description", name: "description", type: "textarea" },
            { label: "Image URL", name: "image", type: "text" },
            { label: "Suggested Fix Budget ($)", name: "amount", type: "number" },
            { label: "Your Email", name: "email", type: "email", readOnly: true, value: user?.email || "" },
          ].map((field) => (
            <div key={field.name} className="w-3/4">
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  rows={4}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-transparent dark:bg-gray-700 dark:text-white focus:outline-green-500"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  required
                  readOnly={field.readOnly || false}
                  value={field.value || ""}
                  className={`w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-transparent ${
                    field.readOnly ? "bg-gray-100 dark:bg-gray-700" : "dark:text-white"
                  } focus:outline-green-500`}
                />
              )}
            </div>
          ))}

          {/* Category Select */}
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
              <option value="Broken Public Property">Broken Public Property</option>
              <option value="Road Damage">Road Damage</option>
            </select>
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
