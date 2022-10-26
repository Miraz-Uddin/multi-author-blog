import { apiSlice } from "../api/apiSlice";
const commentAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (blogId) =>
        `/comments?filters[blog][id][$eq]=${blogId}&populate[user][fields][0]=id`,
      providesTags: ["StoreComment", "UpdateComment"],
    }),
    getCommentsByAuthor: builder.query({
      query: (userId) =>
        `/comments?populate[blog][fields][0]=title&filters[user][id][$eq]=${userId}&filters[blog][id][$null]=false`,
      providesTags: ["StoreComment", "UpdateComment"],
    }),
    getComment: builder.query({
      query: (commentId) =>
        `/comments/${commentId}?populate[blog][fields][0]=title&populate[user][fields][0]=email`,
      providesTags: ["StoreComment", "UpdateComment"],
    }),
    storeComment: builder.mutation({
      query: (data) => ({
        url: "/comments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StoreComment"],
    }),
    updateComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UpdateComment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentsByAuthorQuery,
  useStoreCommentMutation,
  useGetCommentQuery,
  useUpdateCommentMutation,
} = commentAPI;
