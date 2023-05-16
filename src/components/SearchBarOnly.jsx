import React, { useState } from "react";
import {FiSearch}from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom";

const SearchBarOnly = () => {
  const [query,setQuery]=useState();
  const nav=useNavigate();
  const location=useLocation();

  const searchHandler=(e)=>{
    e.preventDefault();
    const SearchParams=new URLSearchParams(location.search);
    SearchParams.set('query',query);
    nav(`/search?${SearchParams}`)
  }

  return (
    <div>
        <form
          onSubmit={(e)=>searchHandler(e)}
          className=" py-2 px-3 shadow-lg shadow-slate-400 flex bg-sky-100 items-center rounded-full w-full"
        >
          <input
            type="text"
            defaultValue={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="SEARCH. . ."
            className="w-full mx-3 bg-transparent border-b border-b-gray-600 border-dotted h-8 text-md"
            style={{ outline: "none" }}
          />
          <button>
            <FiSearch size={"1.5rem"} className="mr-3"/>
          </button>
        </form>
    </div>
  );
};

export default SearchBarOnly;
