import { apiSlice } from "../api/apiSlice";
const footerAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFooterInfo: builder.query({
      query: () => `/p-footer`,
    }),
  }),
});

export const { useGetFooterInfoQuery } = footerAPI;
