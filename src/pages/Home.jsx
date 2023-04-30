import React, { useEffect, useState } from "react";
import { useLatest_MvQuery, useLatest_TvQuery, usePopular_mvQuery, usePopular_tvQuery, useTop_rated_mvQuery, useTop_rated_tvQuery, useTrending_mvQuery, useTrending_tvQuery, useUpComing_MvQuery } from "../redux/services/MovieApi";
import Nav_bar from "../components/Nav_bar";
import Slide from "../components/Slide";
import { NavLink } from "react-router-dom";
import Search_bar from "../components/Search_bar";
import Small_Slide from "../components/Small_Slide";

const Home = () => {
  const { data: Trending_mv } = useTrending_mvQuery();
  const {data:Trending_tv}=useTrending_tvQuery();
  const {data:Popular_mv}=usePopular_mvQuery();
  const {data:Popular_tv}=usePopular_tvQuery();
  const {data:TopRated_mv}=useTop_rated_mvQuery();
  const {data:TopRated_tv}=useTop_rated_tvQuery();
  const {data:Upcoming_mv}=useUpComing_MvQuery();
  const {data:Current_Mv}=useLatest_MvQuery();
  const {data:Current_Tv}=useLatest_TvQuery();
  const [type, setType] = useState("mv");

  useEffect(() => {
  }, [type]);
  return (
    <>
      <div className="px-5 lg:px-10 h-10 flex gap-8 mb-3">
        <button
          onClick={(e) => {
            setType("mv");
          }}
          value={"mv"}
          className={`select-none px-2 ${
            type === "mv"
              ? "is_active bg-gradient-to-t from-gray-500 shadow-lg"
              : null
          }`}
        >
          Movies
        </button>
        <button
          onClick={(e) => {
            setType("tv");
          }}
          value={"tv"}
          className={`select-none px-3 ${
            type === "tv"
              ? "is_active bg-gradient-to-t from-gray-500 shadow-lg"
              : null
          }`}
        >
          Series
        </button>
      </div>
      <div className=" flex">
        <div className="w-full lg:w-2/3 p-3 lg:p-5">
          {/* main slide */}
          <div className="w-full shadow-lg rounded-xl">
            {type === "mv" ? (
              <Slide items={Current_Mv?.results} type={type} />
            ) : (
              <Slide items={Current_Tv?.results} type={type} />
            )}
          </div>
          
          {/* popular slide */}
          <div className="w-full bg-white my-10">
            {
              (Popular_mv?.results&&Popular_tv?.results)? <h1 className="text-3xl my-3">{type==='mv'? "Popular Movies":"Popular Series"}</h1>:null
            }
            {type === "mv" ? (
              <Small_Slide type={type} items={Popular_mv?.results} />
            ) : (
              <Small_Slide type={type} items={Popular_tv?.results} />
            )}
          </div>

          {/* Top rated slide */}
          <div className="w-full bg-white my-10">
            <h1 className=" text-3xl my-3 ">{type==='mv'? "Top Rated Movies":"Top Rated Series"}</h1>
            {type === "mv" ? (
              <Small_Slide type={type} items={TopRated_mv?.results} />
            ) : (
              <Small_Slide type={type} items={TopRated_tv?.results} />
            )}
          </div>

          {/* Upcoming Movie Slide */}
          <div className="w-full bg-white my-10">
            <h1 className=" text-3xl my-3 ">{type==='mv'? "Upcoming Movies":null}</h1>
            {type === "mv" ? (
              <Small_Slide type={type} items={Upcoming_mv?.results} />
            ) : null}
          </div>

        </div>
        <div className="lg:border mb-5 border-gray-500 mt-5"></div>
        <div className=" w-1/3 hidden lg:block p-5">
          <Search_bar type={type} Trending_mv={Trending_mv} Trending_tv={Trending_tv}/>
        </div>
      </div>
    </>
  );
};

export default Home;
