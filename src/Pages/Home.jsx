import React from "react";
import RecentIssues from "./RecentIssues";
import Hero from "../Components/Hero";
import CategoryFilterSection from "../Components/CategoryFilterSection";
import CommunityStats from "./CommunityStats";
import JoinCleanDrive from "./JoinCleanDrive";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <CategoryFilterSection />
      <RecentIssues />
      <CommunityStats />
      <JoinCleanDrive />
    </div>
  );
};

export default Home;
