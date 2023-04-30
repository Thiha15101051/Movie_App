import React, { useState } from "react";

const Explore = () => {
  const [type, setType] = useState("mv");
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
    </>
  );
};

export default Explore;
