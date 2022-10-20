import { apiSlice } from "../api/apiSlice";
const portfolioAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolioHead: builder.query({
      query: () => `/p-project-head`,
    }),
    getProjects: builder.query({
      query: () =>
        `/p-projects?populate[preview_image][fields][0]=url&populate[full_image][fields][0]=url&populate[p_project_tags][fields][0]=title`,
    }),
  }),
});

export const { useGetPortfolioHeadQuery, useGetProjectsQuery } = portfolioAPI;
