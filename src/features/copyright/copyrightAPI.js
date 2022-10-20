import { apiSlice } from "../api/apiSlice";
const copyrightAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCopyrightInfo: builder.query({
      query: () => `/p-copyright`,
    }),
  }),
});

export const { useGetCopyrightInfoQuery } = copyrightAPI;
