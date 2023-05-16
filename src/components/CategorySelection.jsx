import { Accordion, Select } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, reset_Mv_Page, reset_Tv_Page } from "../redux/features/counterSlice";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function CategorySelection() {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.counter);
  const [categoryValue, setCategoryValue] = useState("popularity.desc");
  const nav = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sort_by = queryParams.get("sort_by");
  
  const categoryHandler = (value) => {
    dispatch(changeCategory(value));
    dispatch(reset_Mv_Page());
    dispatch(reset_Tv_Page());
    setCategoryValue(value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort_by", value);
    nav({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };
  return (
    <>
      <Accordion
        variant="separated"
        defaultValue="sort"
        className="shadow-md border-none"
      >
        <Accordion.Item style={{ backgroundColor: "#BAE6FD" }} value="sort">
          <Accordion.Control className="text-2xl">Sort by</Accordion.Control>
          <Accordion.Panel>
            <div className=" bg-gray-200 shadow-lg rounded-lg p-3">
              <form>
                <Select
                  data={[
                    { value: "popularity.desc", label: "Most popular" },
                    { value: "vote_average.desc", label: "Most rating" },
                    { value: "release_date.desc", label: "Latest" },
                  ]}
                  value={category}
                  onChange={categoryHandler}
                />
              </form>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
