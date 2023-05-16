import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Search = () => {
  const nav = useNavigate();
  const location = useLocation();
  const SearchParams=new URLSearchParams(location.search);
  const query=SearchParams.get('query');
  console.log(query)
  return <div>
     
  </div>;
};

export default Search;
