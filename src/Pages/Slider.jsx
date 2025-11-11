import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider = ({ slides }) => {
  return (
    <div className="max-w-8xl mx-auto bg-gray-100 dark:bg-gray-900 rounded-xl p-7 my-10 transition-all">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col md:flex-row items-center p-5 md:p-10 gap-6">
              <div className="md:w-1/2">
                <h1 className="text-3xl md:text-5xl font-bold text-green-700 dark:text-green-400 mb-4">
                  {slide.title}
                </h1>
                <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl">
                  {slide.subtitle}
                </p>
              </div>
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
