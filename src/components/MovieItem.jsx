import React from "react";
import { AiFillStar } from "react-icons/ai";

const MovieItem = ({ item,type }) => {
  return (
    <>
      <div
        className="w-[130px] lg:w-[160px] h-[200px] lg:h-[250px] shadow-2xl rounded-lg hover:opacity-80"
        style={{
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage:
            "url(" +
            `https://image.tmdb.org/t/p/original/${item?.poster_path}` +
            ")",
        }}
      >
        <div className="w-[130px] lg:w-[160px] h-[200px] lg:h-[250px] rounded-lg  bg-gradient-to-t from-black relative">
          <h1 className="text-white p-2 text-lg absolute bottom-0 truncate w-full">
            {type === "movie" ? item?.original_title : item?.original_name}
          </h1>
          <span className="bg-sky-400 flex items-center text-white top-2 right-2 px-2 absolute shadow-2xl text-sm rounded-full">
            <AiFillStar />
            {Number.isInteger(item?.vote_average)
              ? item?.vote_average + ".0"
              : item?.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </>
  );
};

export default MovieItem;
