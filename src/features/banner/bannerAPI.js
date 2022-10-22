import { apiSlice } from "../api/apiSlice";
const bannerAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBannerInfo: builder.query({
      query: () =>
        `/p-banner?populate[background][fields][0]=url&populate[cv]=*`,
    }),
  }),
});

export const { useGetBannerInfoQuery } = bannerAPI;
