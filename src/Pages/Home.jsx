import React from "react";
import RecentIssues from "./RecentIssues";
import Hero from "../Components/Hero";
import CategoryFilterSection from "../Components/CategoryFilterSection";
import CommunityStats from "./CommunityStats";
import JoinCleanDrive from "./JoinCleanDrive";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title>Home | UrbanCare Portal</title>
      </Helmet>
      <Hero />
      <CategoryFilterSection />
      <RecentIssues />
      <CommunityStats />
      <JoinCleanDrive />
    </div>
  );
};

export default Home;
