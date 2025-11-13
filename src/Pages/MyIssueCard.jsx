import React, { useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyIssueCard = ({ issue, refreshIssues }) => {
  const { _id, title, category, location, image, amount, status, description } =
    issue;
  const updateModalRef = useRef(null);
  const [updating, setUpdating] = useState(false);

  // Open Modal
  const handleUpdateModalOpen = () => {
    updateModalRef.current.showModal();
  };

  // Update Issue
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedIssue = {
      title: form.title.value,
      category: form.category.value,
      amount: parseFloat(form.amount.value),
      description: form.description.value,
      status: form.status.value,
    };

    setUpdating(true);
    fetch(`https://urban-care-server.vercel.app/issues/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedIssue),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Issue updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        updateModalRef.current.close();
        refreshIssues();
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
      })
      .finally(() => setUpdating(false));
  };

  // Delete Issue
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This issue will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://urban-care-server.vercel.app/issues/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your issue has been deleted.", "success");
            refreshIssues();
          })
          .catch((err) => {
            Swal.fire("Error", err.message, "error");
          });
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              status === "ongoing"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {status}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Category: <span className="font-medium">{category}</span>
        </p>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FaMapMarkerAlt className="mr-1 text-green-600" />
          {location}
        </div>

        <div className="mt-4">
          <p className="text-sm font-semibold text-green-700 dark:text-green-400">
            💰 Budget: ${amount}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Link
            to={`/issue/${_id}`}
            className="px-4 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
          >
            See Details
          </Link>

          <button
            onClick={handleUpdateModalOpen}
            className="px-4 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
          >
            Update
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Update Modal */}
      <dialog ref={updateModalRef} className="modal">
        <div className="modal-box w-11/12 max-w-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 dark:text-gray-200">
              ✕
            </button>
          </form>

          <h3 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-400 text-center">
            Update Issue
          </h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Issue Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={title}
                required
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-green-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                name="category"
                defaultValue={category}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-green-500"
              >
                <option>Garbage</option>
                <option>Illegal Construction</option>
                <option>Broken Public Property</option>
                <option>Road Damage</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Estimated Budget ($)
              </label>
              <input
                type="number"
                name="amount"
                defaultValue={amount}
                required
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-green-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={description}
                rows="4"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-green-500"
              ></textarea>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                name="status"
                defaultValue={status}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-green-500"
              >
                <option value="ongoing">Ongoing</option>
                <option value="ended">Ended</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-md font-medium text-lg transition"
            >
              {updating ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyIssueCard;
