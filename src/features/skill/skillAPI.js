import { apiSlice } from "../api/apiSlice";
const skillAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSkill: builder.query({
      query: () =>
        `/p-skill?populate[p_expertises][fields][0]=title&populate[p_expertises][fields][1]=percentage`,
    }),
  }),
});

export const { useGetSkillQuery } = skillAPI;
