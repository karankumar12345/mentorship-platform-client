"use client"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mentorApi = createApi({
  reducerPath: "mentorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mentorship-platform-server.onrender.com/api/v1" }), // Update to match your API URL
  endpoints: (builder) => ({
    getAllRequests: builder.query({
        query: (userId) => `/mentorship/getAllRequests/${userId}`, // Pass the userId as part of the URL
        method: "GET",
      }),
    getAllMessage: builder.query({
        query: (userId) => `/mentorship/getAllMessage/${userId}`, // Pass the userId as part of the URL
        method: "GET",
      }),
      
    sendRequest: builder.mutation({
      query: (data) => ({
        url: "/mentorship/createRequest",
        method: "POST",
        body: data,
      }),
    }),
    acceptRequest: builder.mutation({
      query: (data) => ({
        url: "/mentorship/request/accept",
        method: "PUT",
        body: data,
      }),
    }),
    rejectRequest: builder.mutation({
      query: (data) => ({
        url: "/mentorship/request/reject",
        method: "PUT",
        body: data,
      }),
    }),
    deleteRequest: builder.mutation({
      query: (data) => ({
        url: "/mentorship/request/remove",
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllRequestsQuery,
  useSendRequestMutation,
  useAcceptRequestMutation,
  useRejectRequestMutation,
  useDeleteRequestMutation,
  useGetAllMessageQuery
} = mentorApi;
