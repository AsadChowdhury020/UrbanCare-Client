import React from "react";;
import logo from "../assets/Logo.png";
import Slider from "../Pages/Slider";

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "Learn Skills Locally",
      subtitle: "Connect with experts in your area and learn new skills.",
      image: logo,
    },
    {
      id: 2,
      title: "Teach Your Skills",
      subtitle: "Share your knowledge and earn by teaching others.",
      image: logo,
    },
    {
      id: 3,
      title: "Trade & Exchange",
      subtitle: "Swap skills with others in a fun and interactive way.",
      image: logo,
    },
    {
      id: 4,
      title: "Build Your Portfolio",
      subtitle: "Showcase your work and gain credibility in your skill area.",
      image: logo,
    },
    {
      id: 5,
      title: "Find Local Mentors",
      subtitle: "Get guidance from experienced providers near you.",
      image: logo,
    },
    {
      id: 6,
      title: "Join Community Events",
      subtitle: "Participate in workshops and skill-sharing events nearby.",
      image: logo,
    },
    {
      id: 7,
      title: "Earn While Teaching",
      subtitle: "Turn your skills into income by teaching others.",
      image: logo,
    },
  ];
  return (
    <div className="">
      <Slider slides={slides}></Slider>
    </div>
  );
};

export default Hero;
