import React from "react";
import Slider from "react-slick";
import { useGetTestimonialsQuery } from "../../features/testimonial/testimonialAPI";
import Client from "./Client";
import LoadingOrErrorBody from "./LoadingOrErrorBody";
import settings from "./settings";

export default function TestimonialBody() {
  const { data: testimonials, isLoading, isError } = useGetTestimonialsQuery();
  // decide what to render
  let content;
  if (isLoading)
    content = <LoadingOrErrorBody message="Testimonials Data Loading ..." />;
  if (!isLoading && isError)
    content = (
      <LoadingOrErrorBody
        isError={true}
        message="Error while Fetching All Testimonials"
      />
    );
  if (!isLoading && !isError && testimonials?.data?.length === 0)
    content = "No Testimonials Found";
  if (!isLoading && !isError && testimonials?.data?.length > 0) {
    content = (
      <Slider {...settings}>
        {testimonials?.data.map((testimonial) => (
          <Client client={testimonial?.attributes} key={testimonial?.id} />
        ))}
      </Slider>
    );
  }
  return (
    <div className="col-md-12 col-lg-12">
      <div className="testimonial_item wow animated slideInUp testimonial-section">
        {content}
      </div>
    </div>
  );
}
