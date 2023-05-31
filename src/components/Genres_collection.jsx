import React from "react";
import { useMv_genreQuery, useTv_genreQuery } from "../redux/services/MovieApi";
import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

const Genres_collection = ({ type }) => {
  const { data: Mv_items } = useMv_genreQuery();
  const { data: Tv_items } = useTv_genreQuery();
  return (
    <div className="flex flex-wrap gap-3">
      {Mv_items?.genres && Tv_items?.genres
        ? (type === "movie" ? Mv_items?.genres : Tv_items?.genres).map((item) => {
            return (
              <Link
                key={nanoid()}
                to={`/explore?genre=${item?.id}`}
              >
                <button
                  value={type === "mv" ? "movie" : "tv"}
                  className=" text-gray-600 bg-sky-100 p-2 rounded-full shadow-xl"
                >
                  {item?.name}
                </button>
              </Link>
            );
          })
        : null}
        
    </div>
  );
};

export default Genres_collection;
