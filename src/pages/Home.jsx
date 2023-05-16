import React, { useEffect, useState } from "react";
import { useLatest_MvQuery, useLatest_TvQuery, usePopular_mvQuery, usePopular_tvQuery, useTop_rated_mvQuery, useTop_rated_tvQuery, useTrending_mvQuery, useTrending_tvQuery, useUpComing_MvQuery } from "../redux/services/MovieApi";
import Nav_bar from "../components/Nav_bar";
import Slide from "../components/Slide";
import { NavLink } from "react-router-dom";
import Search_bar from "../components/Search_bar";
import Small_Slide from "../components/Small_Slide";
import "animate.css"
import Change_type from "../components/Change_type";
import { useSelector } from "react-redux";
import { SideBar } from "../components/SideBar";

const Home = () => {
  const {isLoading:TrendingMvLoading,data: Trending_mv } = useTrending_mvQuery();
  const {isLoading:TrendingTvLoading,data:Trending_tv}=useTrending_tvQuery();
  const {isLoading:PopularMvLoading,data:Popular_mv}=usePopular_mvQuery();
  const {isLoading:PopularTvLoading,data:Popular_tv}=usePopular_tvQuery();
  const {isLoading:TopRatedMvLoading,data:TopRated_mv}=useTop_rated_mvQuery();
  const {isLoading:TopRatedTvLoading,data:TopRated_tv}=useTop_rated_tvQuery();
  const {isLoading:UpcomingMvLoading,data:Upcoming_mv}=useUpComing_MvQuery();
  const {isLoading:CurrentMvLoading,data:Current_Mv}=useLatest_MvQuery();
  const {isLoading:CurrentTvLoading,data:Current_Tv}=useLatest_TvQuery();
  const {type}=useSelector(state=>state.counter);
  return (
    <>
      {/* changeModeMovieAndTv */}
      <div className="flex justify-between">
        <div className="relative">
          <SideBar />
        </div>
        <div className="w-full lg:w-1/2 mt-[70px] lg:mt-0 p-3 lg:p-5">
          {CurrentTvLoading && CurrentMvLoading ? null : <Change_type />}
          {/* main slide */}
          <div className="w-full mt-3 shadow-lg rounded-xl">
            {type === "movie" ? (
              <Slide items={Current_Mv?.results} type={type} />
            ) : (
              <Slide items={Current_Tv?.results} type={type} />
            )}
          </div>

          {/* popular slide */}
          <div className="w-full my-10">
            {PopularMvLoading && PopularTvLoading ? null : (
              <h1 className="text-2xl font-semibold my-3">
                {type === "movie" ? "Popular Movies" : "Popular Series"}
              </h1>
            )}
            {type === "movie" ? (
              <Small_Slide type={type} items={Popular_mv?.results} />
            ) : (
              <Small_Slide type={type} items={Popular_tv?.results} />
            )}
          </div>

          {/* Top rated slide */}
          <div className="w-full my-10">
            {TopRatedMvLoading && TopRatedTvLoading ? null : (
              <h1 className=" text-2xl font-semibold my-3 ">
                {type === "movie" ? "Top Rated Movies" : "Top Rated Series"}
              </h1>
            )}
            {type === "movie" ? (
              <Small_Slide type={type} items={TopRated_mv?.results} />
            ) : (
              <Small_Slide type={type} items={TopRated_tv?.results} />
            )}
          </div>

          {/* Upcoming Movie Slide */}
          <div className="w-full my-10">
            {UpcomingMvLoading ? null : (
              <h1 className=" text-2xl font-semibold my-3 ">
                {type === "movie" ? "Upcoming Movies" : null}
              </h1>
            )}
            {type === "movie" ? (
              <Small_Slide type={type} items={Upcoming_mv?.results} />
            ) : null}
          </div>
        </div>
        {/* {TrendingMvLoading && TrendingTvLoading ? null : (
          <div className=" lg:border border-gray-500"></div>
        )} */}
        <div className=" w-2/6 bg-gray-300 shadow-lg relative hidden lg:block px-5">
          {TrendingMvLoading && TrendingTvLoading ? null : (
            <Search_bar
              type={type}
              Trending_mv={Trending_mv}
              Trending_tv={Trending_tv}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
