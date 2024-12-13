"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apislice";
import mentorshipSlice from "./slices/mentorshipSlice";
import authSlice from "./features/auth/authslice";
// import { MentorApi } from "./features/profile/profileapi";
import { mentorApi } from "./slices/api";
// Ensure all reducers and middleware are properly configured
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    mentorship: mentorshipSlice,
    [mentorApi.reducerPath]: mentorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware) // Add apiSlice middleware
      .concat(mentorApi.middleware), // Add MentorApi middleware
});

// Initialize any preloaded or necessary data
const initializeApp = async () => {
  await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));
  await store.dispatch(apiSlice.endpoints.LoadUserDetail.initiate({}, { forceRefetch: true }));

};

initializeApp();
