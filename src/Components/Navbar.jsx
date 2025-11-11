import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
   useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };


  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-green-600 font-semibold border-b-2 border-green-600"
      : "text-gray-700 dark:text-gray-200 hover:text-green-600";

  const links = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/all-issues" className={navLinkClass}>
        All Issues
      </NavLink>
      {user && (
        <>
          <NavLink to="/add-issue" className={navLinkClass}>
            Add Issue
          </NavLink>
          <NavLink to="/my-issues" className={navLinkClass}>
            My Issues
          </NavLink>
          <NavLink to="/my-contributions" className={navLinkClass}>
            My Contribution
          </NavLink>
        </>
      )}
    </>
  );

  const formatName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleLogout = () => {
    logOut()
      .then(() => console.log("User logged out"))
      .catch((err) => console.error(err));
  };

  const authButtons = user ? (
    <div className="relative">
      <img
        src={user.photoURL || "https://i.ibb.co/9nQn3kJ/default-avatar.png"}
        alt="user avatar"
        className="w-9 h-9 rounded-full cursor-pointer border-2 border-green-500"
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown && (
        <div className="absolute -right-15 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-sm">
          <p className="px-3 py-2 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
            {
              <div>
                <p>{formatName(user.displayName) || "User"}</p>
                <p>{user.email}</p>
              </div>
            }
          </p>
          <div className="flex justify-center items-center mb-2">
            <button
              onClick={handleLogout}
              className="w-1/2 mx-auto px-4 py-1 border border-green-600 rounded hover:bg-green-600 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <>
      <NavLink
        to="/auth/login"
        className="px-4 py-1 border border-green-600 rounded hover:bg-green-600 hover:text-white"
      >
        Login
      </NavLink>
      <NavLink
        to="/auth/register"
        className="px-4 py-1 border border-green-600 rounded hover:bg-green-600 hover:text-white"
      >
        Register
      </NavLink>
    </>
  );

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md sticky top-0 z-50 rounded-xl">
      <div className="w-11/12 mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img className="w-12 h-12 rounded-full" src={logo} alt="logo" />
          <Link to="/" className="ml-2 text-2xl font-bold text-green-600">
            UrbanCare
          </Link>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6 text-sm font-medium">
          {links}
        </div>

        {/* Right Side Auth */}
        <div className="hidden md:flex items-center gap-4">
          {authButtons}

          {/* Theme toggling button  */}
          <input
             onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {menuOpen ? (
            <FaTimes
              size={22}
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer"
            />
          ) : (
            <FaBars
              size={22}
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3 space-y-3 text-sm font-medium">
          {links}
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            {authButtons}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
