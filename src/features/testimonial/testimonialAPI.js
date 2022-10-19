import { apiSlice } from "../api/apiSlice";
const testimonialAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonialHead: builder.query({
      query: () => `/p-testimonial-head`,
    }),
    getTestimonials: builder.query({
      query: () =>
        `/p-testimonials?[fields][0]=client_rating&[fields][1]=client_name&[fields][2]=client_review&populate[client_image][fields][0]=url`,
    }),
  }),
});

export const { useGetTestimonialHeadQuery, useGetTestimonialsQuery } =
  testimonialAPI;
