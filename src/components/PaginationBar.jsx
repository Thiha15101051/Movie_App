import React, { useEffect, useMemo, useState } from "react";
import { Pagination } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  increase_Mv_Page,
  increase_Tv_Page,
} from "../redux/features/counterSlice";
import { useLocation, useNavigate } from "react-router-dom";

const PaginationBar = ({type,total_pages}) => {
  const [mv_page, setMv_page] = useState(1);
  const [tv_page, setTv_page] = useState(1);
  const [checkMvUrl, setCheckMvUrl] = useState(false);
  const [checkTvUrl, setCheckTvUrl] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const dispatch = useDispatch();
  const { Mv_page, Tv_page } = useSelector((state) => state.counter);
  

  useEffect(()=>{
    if (!page) {
      setMv_page(1)
      setTv_page(1)
    }
  },[type])
  // MvComponentPaginateHandler
  useEffect(() => {
    if (mv_page !== 1 || checkMvUrl) {
      dispatch(increase_Mv_Page(mv_page));
      setCheckMvUrl(true);
      setCheckTvUrl(false);
      dispatch(increase_Mv_Page(mv_page));
      const searchParam = new URLSearchParams(location.search);
      searchParam.set("page", mv_page);
      nav({
        pathname: location.pathname,
        search: searchParam.toString(),
      });
    }
  }, [mv_page]);

  // TvComponentPaginateHandler
  useEffect(() => {
    if (tv_page !== 1 || checkTvUrl) {

      dispatch(increase_Tv_Page(tv_page));
      setCheckMvUrl(false);
      setCheckTvUrl(true);
      dispatch(increase_Mv_Page(mv_page));
      const searchParam = new URLSearchParams(location.search);
      searchParam.set("page", tv_page);
      nav({
        pathname: location.pathname,
        search: searchParam.toString(),
      });
    }
  }, [tv_page]);

  return (
    <div>
      {type === "movie" ? (
        <Pagination
          total={total_pages}
          value={page? mv_page:Mv_page}
          onChange={setMv_page}
          position="center"
          styles={(theme) => ({
            control: {
              "&[data-active]": {
                backgroundImage: theme.fn.gradient({
                  from: "red",
                  to: "yellow",
                }),
              },
            },
          })}
        />
      ) : (
        <Pagination
          total={total_pages}
          position="center"
          value={page? tv_page:Tv_page}
          onChange={setTv_page}
          styles={(theme) => ({
            control: {
              "&[data-active]": {
                backgroundImage: theme.fn.gradient({
                  from: "green",
                  to: "blue",
                }),
              },
            },
          })}
        />
      )}
    </div>
  );
};

export default PaginationBar;
