import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { change_Type, reset_Category, reset_Mv_Page, reset_Tv_Page, reset_Type } from "../redux/features/counterSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Change_type = () => {
    const nav=useNavigate();
    const {type}=useSelector(state=>state.counter);
    const dispatch=useDispatch();
    const location=useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    urlSearchParams.forEach((value, key) => {
      urlSearchParams.delete(key)
    });
  return (
    <>
      <div className=" h-10 flex gap-5  lg:mt-0">
        <button
          onClick={(e) => {
            dispatch(change_Type('movie'))
            dispatch(reset_Mv_Page())
            dispatch(reset_Category())
          }}
          value={'movie'}
          className={`select-none px-2 border-2 rounded-full border-sky-400 ${
            type === "movie"
              ? "is_active  border-none text-gray-50 bg-sky-400 shadow-xl"
              : null
          }`}
        >
          Movies
        </button>
        <button
          onClick={(e) => {
            dispatch(change_Type("tv"));
            dispatch(reset_Tv_Page())
            dispatch(reset_Category());
          }}
          value={'tv'}
          className={`select-none px-3 border-2 rounded-full border-sky-400 ${
            type === "tv"
              ? "is_active  text-gray-50 bg-sky-400 border-none shadow-xl"
              : null
          }`}
        >
          Series
        </button>
      </div>
    </>
  );
};

export default Change_type;
