import React from "react";
import Genres_collection from "./Genres_collection";
import SearchSlide from "./SearchSlide";
import SearchBarOnly from "./SearchBarOnly";

const Search_bar = ({ type, Trending_mv, Trending_tv }) => {
  return (
    <div className="w-full sticky top-5">
      <div className=" w-full">
        <SearchBarOnly />
      </div>
      <div className=" w-full mt-5 ">
        <Genres_collection type={type} />
      </div>
      <div className="w-full mt-5 ">
        <SearchSlide
          type={type}
          Trending_mv={Trending_mv}
          Trending_tv={Trending_tv}
        />
      </div>
    </div>
  );
};

export default Search_bar;
