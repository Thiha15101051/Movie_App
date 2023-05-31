import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDetailQuery, useTrailerQuery } from "../redux/services/MovieApi";
import { SideBar } from "../components/SideBar";
import { RingProgress, Text } from "@mantine/core";
import ReactPlayer from "react-player/youtube";
import { nanoid } from "@reduxjs/toolkit";

const Detail = () => {
  const [switchType, setSwitchType] = useState("overall");
  const { type, id } = useParams();
  const { data, isLoading } = useDetailQuery({ type, id });
  const { data: trailers, isLoading: trailerLoading } = useTrailerQuery({
    type,
    id,
  });
  const title = (
    <div className="lg:flex flex-col gap-5">
      <h1
        className=" text-4xl lg:text-5xl mb-5 text-sky-600 font-semibold"
        style={{ textShadow: "1px 2px 3px black" }}
      >
        {type === "movie" ? data?.original_title : data?.original_name}
      </h1>
      <div className=" flex gap-5 flex-wrap px-10 lg:px-0">
        {data?.genres.map((genre) => {
          return (
            <button
              key={genre.id}
              className=" text-gray-300 px-3 shadow-xl py-1 rounded-md bg-sky-500 "
            >
              {genre.name}
            </button>
          );
        })}
      </div>
    </div>
  );
  const overAll = (
    <div className=" w-full px-5">
      <div className=" my-5 text-2xl">{data?.tagline}</div>
      <div>
        <h1 className=" text-2xl font-semibold mb-2">STORY</h1>
        <p>{data?.overview}</p>
      </div>
      <div className="my-5 flex flex-col gap-3">
        <h1 className=" text-2xl font-semibold mb-2">DETAILS</h1>
        <div className=" text-xl">
          Status: <span className=" text-yellow-600">{data?.status}</span>
        </div>
        <div className=" text-xl">
          Release date:{" "}
          <span className="text-yellow-600">{data?.release_date}</span>
        </div>
        <div className=" text-xl flex">
          <div className=" flex">
            Spoken language
            {data?.spoken_languages.length > 1 ? "s" : null}:
          </div>
          <div className=" flex flex-wrap">
            {data?.spoken_languages.map((language) => {
              return (
                <span className="text-yellow-600" key={nanoid()}>
                  {language.english_name}{" "}
                  {data?.spoken_languages.length > 1 ? "|" : null}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
  const Cast = (
    <div className="mt-5 flex flex-wrap h-[70vh] overflow-hidden overflow-y-scroll ">
      {data?.credits?.cast.map((character) => {
        return (
          <div className=" flex gap-2 p-2 w-1/2" key={character?.credit_id}>
            <img
              className=" w-16 h-16 rounded-[50%] object-cover"
              src={`https://image.tmdb.org/t/p/original${character?.profile_path}`}
              alt=""
            />
            <div className=" flex">
              <div>
                <span className=" font-bold text-sky-700">
                  {character?.name}
                </span>{" "}
                as <span>{character?.character}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  const media = trailers?.results.map((trailer, index) => {
    if (trailer?.type === "Trailer") {
      return (
        <div className=" w-full mb-5" key={trailer?.id}>
          <ReactPlayer
            width="100%"
            height={`250px`}
            controls
            url={`https://www.youtube.com/watch?v=${trailer?.key}`}
          />
          <h1 className=" text-xl text-sky-700 py-3">{trailer?.name}</h1>
        </div>
      );
    }
  });
  return (
    <>
      <div className="flex">
        <div className="relative">
          <SideBar />
        </div>
        {isLoading ? null : (
          <div className=" w-full">
            <div
              className="w-full h-[85vh]"
              style={{
                objectFit: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage:
                  "url(" +
                  `https://image.tmdb.org/t/p/original${data?.backdrop_path}` +
                  ")",
              }}
            >
              <div
                className="w-full h-full  flex flex-col items-center justify-end p-5 bg-gradient-to-t from-black relative"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <div className="w-full flex items-center justify-between  lg:px-20">
                  <div className=" flex items-start lg:items-center flex-col lg:flex-row gap-5">
                    <img
                      src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
                      className="w-[160px]  h-[250px] rounded-xl shadow-2xl shadow-yellow-50"
                      alt=""
                    />
                    <div className="hidden lg:flex">{title}</div>
                  </div>
                  <div>
                    <button className=" text-white text-lg bg-blue-500 px-10 rounded-lg  shadow-xl  py-1">
                      watch
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:hidden my-5">{title}</div>
            <div className="flex flex-col gap-10 lg:gap-0 lg:flex-row">
              <div className=" w-full flex pt-10 lg:flex-col items-start lg:items-center justify-around lg:justify-start  gap-5 lg:w-1/4">
                <div>
                  <h1 className=" text-3xl font-semibold">RATING</h1>
                  <RingProgress
                    roundCaps
                    sections={[
                      {
                        value: Number(data?.vote_average).toFixed() * 10,
                        color: "rgb(4, 153, 195)",
                      },
                    ]}
                    size={100}
                    label={
                      <Text color="blue" weight={700} align="center" size="lg">
                        {Number(data?.vote_average).toFixed(1)}
                      </Text>
                    }
                  />
                </div>
                <div>
                  {type === "movie" ? (
                    <div className=" text-center">
                      <h1 className=" text-3xl font-semibold mb-4">RUNTIME</h1>
                      <span className=" text-2xl text-yellow-700">
                        {data?.runtime}
                      </span>{" "}
                      mins
                    </div>
                  ) : (
                    <div className=" text-center">
                      <h1 className=" text-3xl font-semibold mb-4">
                        ep length
                      </h1>
                      <span className=" text-2xl text-yellow-700">
                        {data?.seasons[0]?.episode_count}
                      </span>{" "}
                      episode{data?.seasons[0]?.episode_count>1? 's':null}
                      <div className=" text-sky-500 font-bold">{data?.seasons[0]?.name}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className=" w-full border-x  pt-10 border-gray-500 lg:w-2/5">
                <div className=" flex justify-center lg:justify-start px-5 gap-8">
                  <button
                    value={"overall"}
                    onClick={(e) => setSwitchType(e.target.value)}
                    className={`border-sky-500 px-4 py-2 border-2 rounded-lg shadow-xl ${
                      switchType === "overall"
                        ? "is_active bg-sky-500 border-none text-white"
                        : null
                    }`}
                  >
                    Overall
                  </button>
                  <button
                    onClick={(e) => setSwitchType(e.target.value)}
                    value={"cast"}
                    className={` border-sky-500 px-4 py-2 border-2 rounded-lg shadow-xl ${
                      switchType === "cast"
                        ? "is_active bg-sky-500 border-none text-white"
                        : null
                    }`}
                  >
                    Cast
                  </button>
                </div>
                {switchType === "overall" ? overAll : Cast}
              </div>
              <div className=" w-full pt-10 lg:w-1/3 h-full px-3">
                <h1 className=" text-4xl font-semibold mb-5">Media</h1>
                <div className=" w-full">{media}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Detail;
