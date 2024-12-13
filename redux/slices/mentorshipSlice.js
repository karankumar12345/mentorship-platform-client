import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
  loading: false,
  error: null,
};

const mentorshipSlice = createSlice({
  name: "mentorship",
  initialState,
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setRequests, setLoading, setError } = mentorshipSlice.actions;

export default mentorshipSlice.reducer;
