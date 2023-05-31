import React, { useRef, useState } from "react";
import {TfiMore} from 'react-icons/tfi'
import { FiPlay } from "react-icons/fi";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper";
import { useMv_genreQuery } from "../redux/services/MovieApi";
import "swiper/css";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Slide({ items,type }) {
  const { data } = useMv_genreQuery();

  return (
    <Swiper
      style={{
        "--swiper-navigation-color": "yellow",
        "--swiper-navigation-size": "15px",
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      rewind={true}
      navigation={true}
      modules={[Navigation,Autoplay]}
      className="mySwiper w-full h-full shadow-xl rounded-xl"
    >
      {items?.map((item) => {
        return (
          <SwiperSlide className="w-full h-full select-none" key={item.id}>
            <div
              className=" w-full h-[300px] lg:h-[400px] "
              style={{
                width: "100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage:
                  "url(" +
                  `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` +
                  ")",
              }}
            >
              <div
                className="w-full h-full bg-gradient-to-t from-black relative"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <div className="w-full h-4/5 flex flex-col justify-around">
                  {/* Title */}
                  <h1
                    style={{ textShadow: "2px 3px 4px black" }}
                    className=" select-none px-5 lg:px-8 lg:text-4xl text-3xl text-sky-500 font-semibold"
                  >
                    {type === "movie"
                      ? item?.original_title
                      : item?.original_name}
                  </h1>
                  {/* genres */}
                  <div className="flex px-5 lg:px-8 flex-wrap">
                    {data?.genres.map((genre, index) => {
                      const filter_genres = item?.genre_ids.includes(genre?.id);
                      if (filter_genres) {
                        return (
                          <div
                            style={{ textShadow: "2px 3px 4px black" }}
                            className="mr-5 border-b border-yellow-400 select-none px-1 rounded-lg text-sky-500"
                            key={index}
                          >
                            {genre?.name}
                          </div>
                        );
                      }
                    })}
                  </div>
                  {/* overview */}
                  <p className="px-5 hidden lg:flex lg:px-8 text-gray-300 max-h-[200px] overflow-hidden">
                    {item?.overview}
                  </p>
                  {/* Vote */}
                  <span className="bg-sky-400 flex items-center text-white top-2 right-2 px-2 absolute shadow-2xl text-md lg:text-lg rounded-full">
                    <AiFillStar />
                    {Number.isInteger(item?.vote_average)
                      ? item?.vote_average + ".0"
                      : item?.vote_average.toFixed(1)}
                  </span>
                  {/* btn */}
                  <div className="flex gap-5 px-5 lg:px-8">
                    <Link key={item?.id} to={`/${type}/${item?.id}`}>
                      <button className=" bg-sky-400 text-yellow-200 text-xl text-center hover:text-black p-4 rounded-full">
                        <TfiMore />
                      </button>
                    </Link>
                    <button className=" bg-sky-400 text-yellow-200 text-xl text-center hover:text-black p-4 rounded-full">
                      <FiPlay />
                    </button>
                  </div>
                  {/* date */}
                  <span className="text-yellow-300 absolute right-3 bottom-3">
                    {type === "movie"
                      ? `Release Date : ` + item?.release_date
                      : `Release Date : ` + item?.first_air_date}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
