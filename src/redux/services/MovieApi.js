import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MovieApi = createApi({
  reducerPath: "MovieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/" }),
  tagTypes: ["movie_api"],
  endpoints: (builder) => ({
    popular_mv: builder.query({
      query: () =>
        `3/movie/popular?api_key=d9d51a8c920ae52197e735dc0a2ba8fd&language=en-US&page=1`,
      providesTags: ["movie_api"],
    }),
    popular_tv: builder.query({
      query: () =>
        `3/tv/popular?api_key=d9d51a8c920ae52197e735dc0a2ba8fd&language=en-US&page=1`,
      providesTags: ["movie_api"],
    }),
    trending_mv: builder.query({
      query: () =>
        `3/trending/movie/week?api_key=d9d51a8c920ae52197e735dc0a2ba8fd`,
      providesTags: ["movie_api"],
    }),
    trending_tv: builder.query({
      query: () =>
        `3/trending/tv/week?api_key=d9d51a8c920ae52197e735dc0a2ba8fd`,
      providesTags: ["movie_api"],
    }),
    top_rated_mv: builder.query({
      query: () =>
        `3/movie/top_rated?api_key=d9d51a8c920ae52197e735dc0a2ba8fd&language=en-US&page=1`,
      providesTags: ["movie_api"],
    }),
    top_rated_tv: builder.query({
      query: () =>
        `3/tv/top_rated?api_key=d9d51a8c920ae52197e735dc0a2ba8fd&language=en-US&page=1`,
      providesTags: ["movie_api"],
    }),
    Mv_genre: builder.query({
      query: () =>
        `3/genre/movie/list?api_key=d9d51a8c920ae52197e735dc0a2ba8fd&language=en-US`,
      providesTags: ["movie_api"],
    }),
    Tv_genre: builder.query({
      query: () =>
        `3/genre/tv/list?api_key=d9d51a8c920ae52197e735dc0a2ba8fd&language=en-US`,
      providesTags: ["movie_api"],
    }),
    upComing_Mv: builder.query({
      query: () =>
        `3/movie/upcoming?api_key=d9d51a8c920ae52197e735dc0a2ba8fd&language=en-US&page=1`,
      providesTags: ["movie_api"],
    }),
    Latest_Mv: builder.query({
      query: () =>
        `3/movie/now_playing?api_key=d9d51a8c920ae52197e735dc0a2ba8fd&language=en-US&page=1`,
      providesTags: ["movie_api"],
    }),
    Latest_Tv: builder.query({
      query: () =>
        `3/tv/airing_today?api_key=d9d51a8c920ae52197e735dc0a2ba8fd&language=en-US&page=1`,
      providesTags: ["movie_api"],
    }),
    Mv_Explore: builder.query({
      query: ({ category, genre, page }) =>
        `3/discover/movie?api_key=d9d51a8c920ae52197e735dc0a2ba8fd&language=en-US&sort_by=${category}&include_adult=false&include_video=false&page=${page}&with_genres=${genre}&with_watch_monetization_types=flatrate`,
      providesTags: ["movie_api"],
    }),
    Tv_Explore: builder.query({
      query: ({ category, genre, page }) =>
        `3/discover/tv?api_key=d9d51a8c920ae52197e735dc0a2ba8fd&language=en-US&sort_by=${category}&include_adult=false&include_video=false&page=${page}&with_genres=${genre}&with_watch_monetization_types=flatrate`,
      providesTags: ["movie_api"],
    }),
    Search: builder.query({
      query: ({ title, query, page }) =>
        `3/search/${title}?api_key=d9d51a8c920ae52197e735dc0a2ba8fd&language=en-US&query=${query}&page=${page}&include_adult=false`,
      providesTags: ["movie_api"],
    }),
  }),
});

export const {useSearchQuery,useMv_ExploreQuery,useTv_ExploreQuery,useLatest_MvQuery,useLatest_TvQuery,useTrending_mvQuery,useTrending_tvQuery,useUpComing_MvQuery,useMv_genreQuery,useTv_genreQuery,usePopular_mvQuery,usePopular_tvQuery,useTop_rated_mvQuery,useTop_rated_tvQuery } = MovieApi;
