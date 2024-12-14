"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogin } from "./auth/authslice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mentorship-platform-server.onrender.com/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "user/refreshToken",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
        } catch (error) {
          console.log("Error refreshing token:", error);
        }
      },
    }),
    LoadUserDetail: builder.query({
      query: () => ({
        url: "user/me",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              token: result.data.token || "guest",
              user: result.data.user || "guest",
            })
          );
        } catch (error) {
          console.log("Error loading user:", error);
        }
      },
    }),
   
   
  }),
});

export const { useRefreshTokenQuery,useLazyLoadUserDetailQuery,useLoadProfileDetailQuery } = apiSlice;
