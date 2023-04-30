import React from "react";
import {FiSearch} from 'react-icons/fi'
import Genres_collection from "./Genres_collection";
import SearchSlide from "./SearchSlide";

const Search_bar = ({ type, Trending_mv, Trending_tv }) => {
  return (
    <>
      <div className=" mx-auto p-3 shadow-inner shadow-slate-400 flex bg-sky-100 items-center rounded-2xl w-11/12">
        <input
          type="text"
          className="w-full mx-3 bg-transparent border-b border-b-black h-8 text-xl"
          style={{ outline: "none" }}
        />
        <button>
          <FiSearch size={"1.5rem"} />
        </button>
      </div>
      <div className=" w-11/12 mt-5 mx-auto">
        <Genres_collection type={type} />
      </div>
      <div className="w-11/12 mt-10 mx-auto">
        <SearchSlide type={type} Trending_mv={Trending_mv} Trending_tv={Trending_tv} />
      </div>
    </>
  );
};

export default Search_bar;
