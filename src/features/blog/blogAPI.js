import { apiSlice } from "../api/apiSlice";
const blogAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
      providesTags: ["Comment"],
    }),
    getBlog: builder.query({
      query: (blogId) =>
        `/blogs/${blogId}?[fields][0]=title&[fields][1]=long_description&[fields][2]=publishedAt&populate[image][fields][0]=url&populate[author][fields][0]=username&populate[tags][fields][0]=title&populate[comments][fields][0]=message&populate[comments][fields][1]=parentId`,
      providesTags: ["Comment"],
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogQuery } = blogAPI;
