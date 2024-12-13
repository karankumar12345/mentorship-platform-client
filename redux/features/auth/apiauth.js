import { apiSlice } from "../apislice";
import { userLogin, userRegistration } from "./authslice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // User Authentication
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(userRegistration({ token: result.data.activationToken }));
        } catch (error) {
          console.log("Registration error:", error);
        }
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLogin({
            token: result.data.token,
            user: result.data.user
          }));
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),

    // Get User Information
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/user/${id}`,
        method: "GET",
      }),
    }),

    getProfileID: builder.query({
      query: (id) => ({
        url: `/profile/singleProfile/${id}`,
        method: "GET",
      }),
    }),

    getProfileUSERID: builder.query({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "GET",
      }),
    }),

    ProfileUpdate: builder.mutation({
      query: (data) => ({
        url: "/profile/create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    GetPRofile: builder.query({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "GET",
       
      }),
    }),

    ProfileDelete: builder.mutation({
      query: (id) => ({
        url: `/profile/deleteProfile/${id}`,
        method: "DELETE",
        body: { id }
      }),
    }),

    filterUsers: builder.query({
      query: (filters) => {
        const queryParams = new URLSearchParams(filters).toString();
        return {
          url: `/profile/search?${queryParams}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),

    requestMentorship: builder.mutation({
      query: (data) => ({
        url: "/mentorship/createRequest",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    getMentorships: builder.query({
      query: (id) => ({
        url: `/mentorships/${id}`,
        method: "GET",
      }),
    }),

    assignMentor: builder.mutation({
      query: ({ mentorshipId, mentorId }) => ({
        url: `/mentorship/assign/${mentorshipId}`,
        method: "PUT",
        body: { mentorId },
        credentials: "include",
      }),
    }),

    deleteMentorship: builder.mutation({
      query: (mentorshipId) => ({
        url: `/mentorship/delete/${mentorshipId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    requestMentorship: builder.mutation({
      query: (data) => ({
        url: "/mentorship/createRequest",
        method: "POST",
        body: data,
      }),
    }),

    // Accept mentorship request
    RequestAccept: builder.mutation({
      query: (data) => ({
        url: "/mentorship/request/accept",
        method: "PUT",
        body: data,
      }),
    }),

    // Get all mentorship requests for a receiver
    getMentorships: builder.query({
      query: (receiver) => ({
        url: `/mentorship/getAllRequest?receiver=${receiver}`,
        method: "GET",
      }),
    }),

    assignMentor: builder.mutation({
      query: ({ mentorshipId, mentorId }) => ({
        url: `/mentorship/assign/${mentorshipId}`,
        method: "PUT",
        body: { mentorId },
      }),
    }),

    deleteMentorship: builder.mutation({
      query: (mentorshipId) => ({
        url: `/mentorship/delete/${mentorshipId}`,
        method: "DELETE",
      }),
    }),

    //get allprofile
    getAllProfile: builder.query({
      query: () => ({
        url: `/profile/allProfile`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserByIdQuery,
  useGetProfileIDQuery,
  useGetProfileUSERIDQuery,
  useProfileUpdateMutation,
  useProfileDeleteMutation,
  useFilterUsersQuery,
  useRequestMentorshipMutation,
  useGetMentorshipsQuery,
  useAssignMentorMutation,
  useDeleteMentorshipMutation,
  useGetAllProfileQuery,
 useGetPRofileQuery
  
} = authApi;
