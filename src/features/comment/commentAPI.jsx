import { apiSlice } from "../api/apiSlice";
const commentAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (blogId) =>
        `/comments?filters[blog][id][$eq]=${blogId}&populate[user][fields][0]=id`,
      providesTags: [
        "UpdateProfile",
        "StoreComment",
        "UpdateComment",
        "DeleteComment",
        "StoreBlog",
        "UpdateBlog",
        "DeleteBlog",
      ],
    }),
    getCommentsByAuthor: builder.query({
      query: (userId) =>
        `/comments?populate[blog][fields][0]=title&filters[user][id][$eq]=${userId}&filters[blog][id][$null]=false`,
      providesTags: [
        "UpdateProfile",
        "StoreComment",
        "UpdateComment",
        "DeleteComment",
        "StoreBlog",
        "UpdateBlog",
        "DeleteBlog",
      ],
    }),
    getComment: builder.query({
      query: (commentId) =>
        `/comments/${commentId}?populate[blog][fields][0]=title&populate[user][fields][0]=email`,
      providesTags: [
        "UpdateProfile",
        "StoreComment",
        "UpdateComment",
        "StoreBlog",
        "UpdateBlog",
        "DeleteBlog",
      ],
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
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeleteComment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentsByAuthorQuery,
  useStoreCommentMutation,
  useGetCommentQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentAPI;
