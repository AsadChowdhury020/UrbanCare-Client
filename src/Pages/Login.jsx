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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 rounded-xl">
            <Helmet>
        <title>Login | UrbanCare Portal</title>
      </Helmet>
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
          Login to UrbanClean
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Don’t have an account?{" "}
            <Link to="/auth/register" className="text-green-600 font-semibold">
              Register
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
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
