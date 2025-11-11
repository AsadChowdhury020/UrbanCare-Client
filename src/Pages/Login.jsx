import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import { Helmet } from "react-helmet";

const Login = () => {
  const { SigninUser, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    SigninUser(email, password)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
        });
      });
  };

  const handleGoogle = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged in with Google!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) =>
        Swal.fire({ icon: "error", title: "Error", text: err.message })
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 rounded-xl">
      <Helmet>
        <title>Login | UrbanCare Portal</title>
      </Helmet>

      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700 dark:text-green-400">
          Login to UrbanCare
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4 text-gray-700 dark:text-gray-300">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/auth/register"
              className="text-green-600 dark:text-green-400 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center my-5">
          <div className="border-t border-gray-300 dark:border-gray-600 w-1/4"></div>
          <span className="mx-3 text-gray-500 dark:text-gray-400">or</span>
          <div className="border-t border-gray-300 dark:border-gray-600 w-1/4"></div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-md flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-800 dark:text-gray-200 font-medium">
            Login with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
