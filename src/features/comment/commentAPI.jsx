import { apiSlice } from "../api/apiSlice";
const commentAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (blogId) =>
        `/comments?filters[blog][id][$eq]=${blogId}&populate[user][fields][0]=id`,
      providesTags: ["Comment"],
    }),
    storeComment: builder.mutation({
      query: (data) => ({
        url: "/comments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const { useGetCommentsQuery, useStoreCommentMutation } = commentAPI;
