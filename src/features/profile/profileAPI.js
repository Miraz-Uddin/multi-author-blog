import { apiSlice } from "../api/apiSlice";

export const profileAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (userId) =>
        `/profiles?filters[user][id][$eq]=${userId}&populate[avatar][fields][0]=url&populate[user][fields][0]=email`,
    }),
    storeProfile: builder.mutation({
      query: (data) => ({
        url: "/profiles",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetProfileQuery } = profileAPI;
