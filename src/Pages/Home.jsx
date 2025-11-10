import React from "react";
import RecentIssues from "./RecentIssues";
import Hero from "../Components/Hero";

const Home = () => {
  return (
    <div>
      {/* Hero Sections */}
      <Hero></Hero>
      <RecentIssues></RecentIssues>
    </div>
  );
};

export default Home;
