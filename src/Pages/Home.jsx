import React from "react";
import RecentIssues from "./RecentIssues";
import Hero from "../Components/Hero";
import CategoryFilterSection from "../Components/CategoryFilterSection";

const Home = () => {
  return (
    <div>
      {/* Hero Sections */}
      <Hero></Hero>
      <CategoryFilterSection></CategoryFilterSection>
      <RecentIssues></RecentIssues>
    </div>
  );
};

export default Home;
