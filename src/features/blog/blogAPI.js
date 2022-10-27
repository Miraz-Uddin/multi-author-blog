import { apiSlice } from "../api/apiSlice";
const blogAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogHead: builder.query({
      query: () => `/p-blog-head`,
    }),
    getBlogs: builder.query({
      query: ({ tags, monthYear }) => {
        const mainUrl =
          "/blogs?[fields][0]=title&[fields][1]=short_description&[fields][2]=publishedAt&populate[image][fields][0]=url&populate[author][fields][0]=username&populate[comments]=*&populate[tags][fields][0]=title";
        let query = "";
        if (tags) {
          query += `&filters[tags][title][$eq]=${tags}`;
        }
        if (monthYear) {
          const month = monthYear.split(",");
          query += `&filters[publishedAt][$gte]=${month[0]}&filters[publishedAt][$lte]=${month[1]}`;
        }
        return mainUrl + query;
      },
      providesTags: [
        "StoreComment",
        "UpdateComment",
        "StoreBlog",
        "UpdateBlog",
        "DeleteBlog",
        "StoreProfile",
        "UpdateProfile",
        "DeleteComment",
      ],
    }),
    getBlog: builder.query({
      query: (blogId) =>
        `/blogs/${blogId}?populate[image][fields][0]=url&populate[author][fields][0]=username&populate[tags][fields][0]=title&populate[comments][fields][0]=message&populate[comments][fields][1]=parentId`,
      providesTags: [
        "StoreComment",
        "UpdateComment",
        "StoreBlog",
        "UpdateBlog",
        "DeleteBlog",
        "StoreProfile",
        "UpdateProfile",
        "DeleteComment",
      ],
    }),
    getBLogsByAuthor: builder.query({
      query: (userId) =>
        `/blogs?[fields][0]=title&[fields][1]=short_description&[fields][2]=publishedAt&populate[image][fields][0]=url&populate[author][fields][0]=username&populate[comments]=*&populate[tags][fields][0]=title&filters[author][id][$eq]=${userId}`,
      providesTags: [
        "StoreComment",
        "UpdateComment",
        "StoreBlog",
        "UpdateBlog",
        "DeleteBlog",
        "StoreProfile",
        "UpdateProfile",
        "DeleteComment",
      ],
    }),
    storeBlog: builder.mutation({
      query: (data) => ({
        url: "/blogs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StoreBlog"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UpdateBlog"],
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeleteBlog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useGetBlogHeadQuery,
  useGetBLogsByAuthorQuery,
  useUpdateBlogMutation,
  useStoreBlogMutation,
  useDeleteBlogMutation,
} = blogAPI;

// {{base_url}}
