import { apiSlice } from "../api/apiSlice";
const counterAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCounter: builder.query({
      query: () => `/p-counter`,
    }),
  }),
});

export const { useGetCounterQuery } = counterAPI;
