import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import SearchBarOnly from "../components/SearchBarOnly";
import { Accordion, Pagination, Select } from "@mantine/core";
import { useSearchQuery } from "../redux/services/MovieApi";
import { useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";

const Search = () => {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("multi");
  const nav = useNavigate();
  const location = useLocation();
  const SearchParams = new URLSearchParams(location.search);
  const query = SearchParams.get("query");
  const { data, isLoading, refetch } = useSearchQuery({ title, query,page });

  useEffect(() => {
    refetch();
  }, [title, query,page, refetch]);

console.log(data)
  return (
    <>
      <div className="flex">
        <div className="relative">
          <SideBar />
        </div>
        <div className=" w-full">
          <div className=" w-full mt-20 lg:mt-5">
            <h1 className=" text-center text-2xl lg:text-4xl font-semibold">
              Find your favorite movies, TV shows, people and more
            </h1>
            {/* search */}
            <div className=" w-full flex justify-between px-0 lg:px-20 items-center flex-col lg:flex-row mt-5">
              <div className=" w-3/4 lg:w-1/2">
                <SearchBarOnly value={query} />
              </div>
              <div className=" w-1/2 lg:w-3/12 mt-5 lg:my-0">
                <Accordion
                  variant="separated"
                  defaultValue="sort"
                  className="shadow-md border-none"
                >
                  <Accordion.Item
                    style={{ backgroundColor: "#BAE6FD" }}
                    value="sort"
                  >
                    <Accordion.Control className="text-2xl">
                      Sort by
                    </Accordion.Control>
                    <Accordion.Panel>
                      <div className=" bg-gray-200 shadow-lg rounded-lg p-3">
                        <form>
                          <Select
                            data={[
                              {
                                value: "multi",
                                label: "All",
                              },
                              {
                                value: "movie",
                                label: "Movies",
                              },
                              { value: "tv", label: "Tv Shows" },
                              { value: "person", label: "People" },
                            ]}
                            value={title}
                            onChange={setTitle}
                          />
                        </form>
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
          {query && !isLoading ? (
            <h1 className=" text-2xl lg:px-20 my-3 text-center lg:text-left lg:text-3xl">
              {`Search results for "${query}" (${
                data?.total_results +
                " " +
                (data?.total_results > 1 ? "results" : "result")
              })`}
            </h1>
          ) : null}

          <div className="w-full flex flex-wrap lg:px-20 my-10">
            {query ? (
              <div className="w-full flex justify-center lg:justify-start flex-wrap gap-5">
                {data?.results.map((item) => {
                  // return <h1>{ result?.title:result?.name}</h1>;
                  return (
                    <Link
                      key={item?.id}
                      to={
                        (item?.media_type === "person"|| title==='person')
                          ? `/search`
                          : `/${title==="multi"? item.media_type:title}/${item?.id}`
                      }
                    >
                      <div
                        className="w-[130px] lg:w-[160px] h-[200px] lg:h-[250px] shadow-2xl rounded-lg hover:opacity-80"
                        style={{
                          objectFit: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundImage:
                            "url(" +
                            `https://image.tmdb.org/t/p/original${
                              title === "person"
                                ? item?.profile_path
                                : item?.poster_path
                            }` +
                            ")",
                        }}
                        key={item?.id}
                      >
                        <div className="w-[130px] lg:w-[160px] h-[200px] lg:h-[250px] rounded-lg  bg-gradient-to-t from-black relative">
                          <h1 className="text-white p-2 text-lg absolute bottom-0 truncate w-full">
                            {item?.media_type === "movie"
                              ? item?.title
                              : item?.name}
                          </h1>
                          <span className="bg-sky-400 flex items-center text-white top-2 right-2 px-2 absolute shadow-2xl text-sm rounded-full">
                            <AiFillStar />
                            {title === "person"
                              ? null
                              : Number.isInteger(item?.vote_average)
                              ? item?.vote_average + ".0"
                              : Number(item?.vote_average).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className=" select-none p-20 text-2xl text-gray-500">
                Search something . . .
              </div>
            )}
          </div>
          {
            query? <div className=" mb-5"><Pagination
            total={data?.total_pages}
            value={data?.page}
            onChange={setPage}
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
          /></div>:null
          }
        </div>
      </div>
    </>
  );
};

export default Search;
