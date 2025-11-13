import React from "react";
import Slider from "../Pages/Slider";

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "Garbage",
      subtitle:
        "Report uncollected garbage or overflowing waste in your community.",
      image: "https://i.ibb.co.com/d4z4GXDf/Garbage.jpg",
    },
    {
      id: 2,
      title: "Illegal Construction",
      subtitle: "Report unauthorized or unsafe construction in public areas.",
      image: "https://i.ibb.co.com/8Lgz3Sjp/Illegal-Construction.webp",
    },
    {
      id: 3,
      title: "Broken Public Property",
      subtitle:
        "Report damaged benches, streetlights, or other public facilities.",
      image: "https://i.ibb.co.com/xSFNywrS/Broken-Property.webp",
    },
    {
      id: 4,
      title: "Road Damage",
      subtitle: "Report potholes, cracks, or damaged roads needing repair.",
      image:
        "https://i.ibb.co.com/ZpqQ7cRf/Road-Damage.jpghttps://i.ibb.co.com/ZpqQ7cRf/Road-Damage.jpg",
    },
  ];

  return (
    <div className="">
      <Slider slides={slides}></Slider>
    </div>
  );
};

export default Hero;
