"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jioSavaanapi = createApi({
  reducerPath: "jioSavaanapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://saavn.me",
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: ({ language }) => `/modules?language=${language}`,
    }),
    getSongsDetails: builder.query({
      query: ({ songid }) => `/playlists?id=${songid}`,
    }),
    getTopSongsDetails: builder.query({
      query: ({ songid }) => `/songs?id=${songid}`,
    }),
    getNewReleasesDetails: builder.query({
      query: ({ songid }) => `/albums?id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `artists/?id=${artistId}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search/songs?query=${searchTerm}`,
    }),
  }),
});

export const {
  useGetArtistDetailsQuery,
  useGetTopChartsQuery,
  useGetSongsDetailsQuery,
  useGetTopSongsDetailsQuery,
  useGetNewReleasesDetailsQuery,
  useGetSongsBySearchQuery,
} = jioSavaanapi;
