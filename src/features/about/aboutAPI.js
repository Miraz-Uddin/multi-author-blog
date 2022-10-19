import { apiSlice } from "../api/apiSlice";
const aboutAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => `/p-about?populate[featured_image][fields][0]=url`,
    }),
  }),
});

export const { useGetAboutQuery } = aboutAPI;
