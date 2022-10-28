import { apiSlice } from "../api/apiSlice";
const tagAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => `/tags?fields[0]=title`,
      providesTags: [
        "StoreTag",
        "UpdateTag",
        "DeleteTag",
        "StoreBlog",
        "UpdateBlog",
        "DeleteBlog",
      ],
    }),
    storeTag: builder.mutation({
      query: (data) => ({
        url: "/tags",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StoreTag"],
    }),
    updateTag: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tags/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UpdateTag"],
    }),
    deleteTag: builder.mutation({
      query: (tagId) => ({
        url: `/tags/${tagId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeleteTag"],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useStoreTagMutation,
  useDeleteTagMutation,
  useUpdateTagMutation,
} = tagAPI;
