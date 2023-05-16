import React, { useEffect, useState } from "react";
import SearchBarOnly from "../components/SearchBarOnly";
import { useDispatch, useSelector } from "react-redux";
import MovieItem from "../components/MovieItem";
import CategorySelection from "../components/CategorySelection";
import {
  useMv_ExploreQuery,
  useTv_ExploreQuery,
} from "../redux/services/MovieApi";
import Change_type from "../components/Change_type";
import Pagination from "../components/PaginationBar";
import Genres_collection_for_explore from "../components/Genres_collection_for_explore";
import { Link, useLocation, useParams } from "react-router-dom";
import { reset_Type } from "../redux/features/counterSlice";
import PaginationBar from "../components/PaginationBar";
import { SideBar } from "../components/SideBar";

const Explore = () => {
  const dispatch = useDispatch();
  const {
    genre: genreType,
    category: globalCategory,
    Mv_page,
    Tv_page,
    type,
  } = useSelector((state) => state.counter);
  const location = useLocation();
  const SearchParams = new URLSearchParams(location.search);
  const category = SearchParams.has("sort_by")
    ? SearchParams.get("sort_by")
    : globalCategory;
  const genre = SearchParams.has("genre") ? SearchParams.get("genre") : null;
  const page =SearchParams.has('page')? SearchParams.get('page'): (type==='movie'? Mv_page:Tv_page);
  const {
    data: Mv_Data,
    refetch: Mv_refresh,
    isLoading: Mv_Loading,
  } = useMv_ExploreQuery({ category, genre, page });
  const {
    data: Tv_Data,
    refetch: Tv_refresh,
    isLoading: Tv_Loading,
  } = useTv_ExploreQuery({ category, genre, page });

  let TotalPages;
  if (type==='movie') {
    TotalPages=Mv_Data?.total_pages;
  }else{
    TotalPages=Tv_Data?.total_pages
  }

  useEffect(() => {
    Mv_refresh();
  }, [category, genre, page, Mv_refresh]);

  useEffect(() => {
    Tv_refresh();
  }, [Tv_refresh]);

  return (
    <>
      <div className="flex">
        <div className="relative">
          <SideBar />
        </div>
        <div className=" flex flex-col items-center lg:items-start">
          {/* movieAndSeriesChangeModeBtn /* searchBar */}
          <div className="w-full flex flex-row lg:flex-col mt-16 lg:mt-0 items-center lg:items-start pl-4 lg:pl-0 gap-8 lg:gap-0">
            <Link to={"/explore"} className="lg:px-6 mt-0 lg:mt-3">
              <Change_type />
            </Link>
            <div className="lg:pr-1 lg:pl-6  w-full flex flex-col lg:flex-row my-3 lg:mb-8 items-center justify-between gap-5 lg:gap-28 ">
              <h1
                className=" text-4xl hidden lg:block font-semibold"
                style={{ textShadow: "1px 2px 5px grey" }}
              >
                FIND FILMS THAT BEST FIT YOU
              </h1>
              <SearchBarOnly />
            </div>
          </div>
          {/* moviesOrSeries */}
          <div className="w-full  justify-center flex flex-col lg:flex-row-reverse">
            <div className="w-full lg:w-1/4 px-7 lg:px-3">
              {/* sort by category */}
              <CategorySelection />
              {/* filter by genres */}
              <Genres_collection_for_explore />
            </div>
            <div className="w-full lg:w-9/12 flex flex-wrap justify-center gap-5">
              {type === "movie"
                ? Mv_Data?.results?.map((item) => (
                    <MovieItem item={item} type={type} key={item.id} />
                  ))
                : Tv_Data?.results?.map((item) => (
                    <MovieItem item={item} type={type} key={item.id} />
                  ))}
              {/* seeMoreBtn */}
              {Mv_Loading && Tv_Loading ? null : (
                <div className="my-5 lg:my-10 px-10 flex w-full justify-center">
                  <PaginationBar type={type} total_pages={TotalPages} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Explore;
