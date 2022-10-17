import { apiSlice } from "../api/apiSlice";
const tagAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => `/tags?fields[0]=title`,
    }),
  }),
});

export const { useGetTagsQuery } = tagAPI;
