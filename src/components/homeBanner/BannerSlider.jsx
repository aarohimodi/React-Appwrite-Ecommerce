import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.jpg";
function BannerSlider() {
  const banner = [slide1, slide2];
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      {banner.map((banner, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-full h-[500px] bg-center bg-cover "
            style={{ backgroundImage: `url(${banner})` }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BannerSlider;
