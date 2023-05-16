import React, { useState } from "react";
import { useMv_genreQuery, useTv_genreQuery } from "../redux/services/MovieApi";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addGenre, reset_Mv_Page, reset_Tv_Page } from "../redux/features/counterSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Accordion, ScrollArea } from "@mantine/core";

const Genres_collection_for_explore = () => {
  const dispatch=useDispatch();
  const {type}=useSelector(state=>state.counter);
  const nav=useNavigate();
  const location=useLocation();
  const {genre}=useSelector(state=>state.counter);
  const [genreName,SetGenreName]=useState('');
  const { data: Mv_items,isLoading:Mv_genre_loading } = useMv_genreQuery();
  const { data: Tv_items,isLoading:Tv_genre_loading } = useTv_genreQuery();


  const GenreHandler=(item)=>{
    const searchParams=new URLSearchParams(location.search);
    searchParams.set('genre',item?.id);
    SetGenreName(item?.name);
    dispatch(addGenre(item?.id));
    nav({
      pathname:location.pathname,
      search: searchParams.toString(),
    });
    if (item.id!==genre) {
     return (dispatch(reset_Mv_Page()),
     dispatch(reset_Tv_Page()))
    }
  }
  return (
    <Accordion
      variant="separated"
      defaultValue="filter"
      className="shadow-md border-none my-5 lg:my-10"
    >
      <Accordion.Item style={{ backgroundColor: "#BAE6FD" }} value="filter">
        <Accordion.Control className="text-2xl">Filter</Accordion.Control>
        <Accordion.Panel>
          <ScrollArea h={250} type="hover" offsetScrollbars scrollbarSize={6}>
            <div className="flex flex-wrap gap-3">
              {Mv_genre_loading && Tv_genre_loading
                ? null
                : (type === "movie" ? Mv_items?.genres : Tv_items?.genres)?.map(
                    (item) => {
                      return (
                        <button
                          onClick={() => GenreHandler(item)}
                          value={type === "movie" ? "movie" : "tv"}
                          key={nanoid()}
                          className={`bg-sky-100 p-2 rounded-full shadow-xl ${
                            genreName.toLowerCase() === item?.name.toLowerCase()
                              ? "bg-sky-400 text-white"
                              : null
                          }`}
                        >
                          {item?.name}
                        </button>
                      );
                    }
                  )}
            </div>
          </ScrollArea>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default Genres_collection_for_explore;
