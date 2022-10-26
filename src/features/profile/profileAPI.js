import { apiSlice } from "../api/apiSlice";

export const profileAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (userId) =>
        `/profiles?filters[user][id][$eq]=${userId}&populate[avatar][fields][0]=url&populate[user][fields][0]=email`,
      providesTags: [
        "UpdateProfile",
        "StoreComment",
        "UpdateComment",
        "StoreBlog",
        "UpdateBlog",
        "DeleteBlog",
        "DeleteComment",
      ],
    }),
    getProfileById: builder.query({
      query: (profileId) => `/profiles/${profileId}?populate[user]=*`,
      providesTags: [
        "UpdateProfile",
        "StoreComment",
        "UpdateComment",
        "StoreBlog",
        "UpdateBlog",
        "DeleteBlog",
        "DeleteComment",
      ],
    }),
    storeProfile: builder.mutation({
      query: (data) => ({
        url: "/profiles",
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/profiles/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UpdateProfile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetProfileByIdQuery,
  useUpdateProfileMutation,
} = profileAPI;
