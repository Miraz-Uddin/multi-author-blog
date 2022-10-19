import React from "react";
import TestimonialBody from "./TestimonialBody";
import TestimonialHead from "./TestimonialHead";

export default function Testimonials() {
  return (
    <section
      id="testimonial"
      className="py_80 full_row bg_white"
      name="testimonial"
    >
      <div className="container">
        <div className="row">
          <TestimonialHead />
          <TestimonialBody />
        </div>
      </div>
    </section>
  );
}
