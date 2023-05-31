import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

// this component is to show slide for home page's search bar

const SearchSlide = ({ type, Trending_mv, Trending_tv }) => {
  return (
    <div className=" flex flex-col w-full flex-wrap gap-5">
      <h1 className=" font-semibold text-2xl">
        {type === "movie" ? "Trending Movies" : "Trending Series"}
      </h1>
      {Trending_mv?.results && Trending_tv?.results
        ? (type === "movie" ? Trending_mv?.results : Trending_tv?.results).map(
            (item, index) => {
              if (index >= 2) {
                return;
              }
              return (
                <Link key={item.id} to={`/${type}/${item?.id}`}>
                  <div className=" w-full  flex">
                    <img
                      className=" w-28 rounded-lg shadow-xl"
                      src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                      alt=""
                    />
                    <div className=" flex flex-col justify-around">
                      <h2 className=" text-xl font-bold pl-5">
                        {type === "movie"
                          ? item?.original_title
                          : item?.original_name}
                      </h2>
                      <div className=" text-lg text-sky-500 pl-5">
                        {type === "movie"
                          ? item?.release_date
                          : item?.first_air_date}
                      </div>
                      <div className="pl-5">
                        <span className="bg-sky-400 w-20 flex items-center text-white px-3 shadow-2xl text-lg rounded-full">
                          <AiFillStar />
                          {Number.isInteger(item?.vote_average)
                            ? item?.vote_average + ".0"
                            : item?.vote_average.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          )
        : "loading"}
      <Link to={`/explore`} className=" w-full">
        <button className=" w-full bg-sky-400 py-3 rounded-xl text-xl text-yellow-300 my-3">
          See More
        </button>
      </Link>
    </div>
  );
};

export default SearchSlide;
