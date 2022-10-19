import { apiSlice } from "../api/apiSlice";
const serviceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getService: builder.query({
      query: () => `/p-service-list?populate[p_services]=*`,
    }),
  }),
});

export const { useGetServiceQuery } = serviceAPI;
