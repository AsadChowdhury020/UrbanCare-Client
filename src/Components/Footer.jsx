import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-10 py-3 mt-10 rounded-xl">
      <div className="px-5 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/*Logo & Short Description */}
        <div>
          <h2 className="text-2xl font-bold text-green-600">UrbanCare</h2>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Empowering communities to report, track, and resolve local 
            cleanliness and infrastructure issues — for a cleaner and greener tomorrow.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-green-600 transition">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-green-600 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-green-600 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-green-600 transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-100">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-green-600 transition">Home</a>
            </li>
            <li>
              <a href="/add-issue" className="hover:text-green-600 transition">Add Issue</a>
            </li>
            <li>
              <a href="/my-issues" className="hover:text-green-600 transition">My Issues</a>
            </li>
            <li>
              <a href="/all-issues" className="hover:text-green-600 transition">All Issues</a>
            </li>
            <li>
              <a href="/my-contributions" className="hover:text-green-600 transition">My Contributions</a>
            </li>
          </ul>
        </div>

        {/* Contact / About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-100">
            Get in Touch
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Have an idea or feedback? Reach out to us anytime.
          </p>
          <p className="mt-2 text-sm flex items-center gap-1">
            <MdOutlineEmail/> support@urbancare.com
          </p>
          <p className="mt-1 text-sm flex items-center gap-1">
            <CiLocationOn /> Dhaka, Bangladesh
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-5 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} <span className="font-semibold text-green-600">UrbanCare</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
