import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {AiFillStar} from "react-icons/ai"

// Import Swiper styles
import "swiper/css";

const Small_Slide = ({type,items }) => {
  return (
    <>
      <Swiper slidesPerView={4} spaceBetween={10}>
        {items?.map((item) => {
          return (
            <SwiperSlide
              className="w-full h-full hover:opacity-75 select-none"
              key={item?.id}
            >
              <div
                className="lg:w-[200px] h-[200px] lg:h-[350px]"
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
                <div className="w-full h-[200px] lg:h-[350px] bg-gradient-to-t from-black relative">
                  <h1 className="text-sky-400 font-semibold p-2 text-xl lg:text-2xl absolute bottom-0 truncate w-full">
                    {
                        type==='mv'? item?.original_title:item?.original_name
                    }
                  </h1>
                  <span className="bg-sky-400 top-2 text-white right-2 flex items-center px-2 absolute shadow-2xl text-sm lg:text-lg rounded-full">
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
