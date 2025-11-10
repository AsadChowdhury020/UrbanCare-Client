import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import { Toaster } from "react-hot-toast";

const AuthenticationLayout = () => {
  return (
    <div>
      <header className="w-11/12 mx-auto my-5">
        <Navbar></Navbar>
      </header>
      <main className="w-11/12 mx-auto my-5">
        <Outlet></Outlet>
      </main>
      <footer className="w-11/12 mx-auto my-5">
        <Footer></Footer>
      </footer>
      <Toaster></Toaster>
    </div>
  );
};

export default AuthenticationLayout;
