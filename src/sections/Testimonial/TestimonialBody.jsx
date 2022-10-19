import React from "react";
import Slider from "react-slick";
import { useGetTestimonialsQuery } from "../../features/testimonial/testimonialAPI";
import Client from "./Client";
import settings from "./settings";
import TestimonialLoading from "./TestimonialLoading";

export default function TestimonialBody() {
  const { data: testimonials, isLoading, hasError } = useGetTestimonialsQuery();
  // decide what to render
  let content;
  if (isLoading) content = <TestimonialLoading />;
  if (!isLoading && hasError) content = "Error while Fetching All Testimonials";
  if (!isLoading && !hasError && testimonials?.data?.length === 0)
    content = "No Testimonials Found";
  if (!isLoading && !hasError && testimonials?.data?.length > 0) {
    content = testimonials?.data.map((testimonial) => (
      <Client client={testimonial?.attributes} key={testimonial?.id} />
    ));
  }
  return (
    <div className="col-md-12 col-lg-12">
      <div className="testimonial_item wow animated slideInUp testimonial-section">
        <Slider {...settings}>{content}</Slider>
      </div>
    </div>
  );
}
