import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    // Password validation
    if (password.length < 6) {
      return Swal.fire("Error", "Password must be at least 6 characters", "error");
    }
    if (!/[A-Z]/.test(password)) {
      return Swal.fire("Error", "Password must contain an uppercase letter", "error");
    }
    if (!/[a-z]/.test(password)) {
      return Swal.fire("Error", "Password must contain a lowercase letter", "error");
    }

    setLoading(true);
    createUser(email, password)
      .then(() => {
        updateUser({ displayName: name, photoURL });
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire("Error", err.message, "error");
      });
  };

  const handleGoogle = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Registered with Google!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
          Register Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full border p-3 rounded-md focus:outline-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border p-3 rounded-md focus:outline-green-500"
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            required
            className="w-full border p-3 rounded-md focus:outline-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full border p-3 rounded-md focus:outline-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <Link to="/auth/login" className="text-green-600 font-semibold">
              Login
            </Link>
          </p>
        </div>

        <div className="divider my-4">or</div>
        <button
          onClick={handleGoogle}
          className="w-full border border-gray-300 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
