import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider = ({ slides }) => {
  return (
    <div className="max-w-7xl mx-auto bg-gray-100 rounded-xl p-7 my-10">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className=" w-11/12 mx-auto flex flex-col md:flex-row items-center md:p-10 gap-6 md:gap-10">
              {/* Text */}
              <div className="md:w-1/2">
                <h1 className="text-3xl md:text-5xl font-bold text-blue-800 mb-4">
                  {slide.title}
                </h1>
                <p className="text-gray-700 text-lg md:text-xl">
                  {slide.subtitle}
                </p>
              </div>
              {/* Image */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="rounded-xl shadow-lg w-64 md:w-96"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
