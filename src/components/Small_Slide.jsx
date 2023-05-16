import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {AiFillStar} from "react-icons/ai"
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";

const Small_Slide = ({type,items }) => {
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "white",
          "--swiper-navigation-size": "20px",
        }}
        slidesPerView={3}
        modules={[Navigation]}
        navigation={true}
        spaceBetween={10}
      >
        {items?.map((item) => {
          return (
            <SwiperSlide
              className="w-full h-full hover:opacity-75 select-none"
              key={item?.id}
            >
              <div
                className="lg:w-[170px] rounded-md h-[200px] lg:h-[300px]"
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage:
                    "url(" +
                    `https://image.tmdb.org/t/p/original/${item?.poster_path}` +
                    ")",
                }}
              >
                <div className="w-full rounded-md h-[200px] lg:h-[300px] bg-gradient-to-t from-black relative">
                  <h1 className="text-white p-2 text-md lg:text-xl absolute bottom-0 truncate w-full">
                    {type === "movie" ? item?.original_title : item?.original_name}
                  </h1>
                  <span className="bg-sky-400 top-2 text-white right-2 flex items-center px-2 absolute shadow-2xl text-sm lg:text-md rounded-full">
                    <AiFillStar />
                    {Number.isInteger(item?.vote_average)
                      ? item?.vote_average + ".0"
                      : item?.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Small_Slide;
