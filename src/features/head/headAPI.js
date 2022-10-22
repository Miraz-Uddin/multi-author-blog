import { apiSlice } from "../api/apiSlice";
const headerAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeaderInfo: builder.query({
      query: () =>
        `/p-header?populate[logo_white_bg][fields][0]=url&populate[logo_transparent_bg][fields][0]=url&populate[head_favicon][fields][0]=url`,
    }),
  }),
});

export const { useGetHeaderInfoQuery } = headerAPI;
