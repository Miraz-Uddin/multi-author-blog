import React, { useEffect } from "react";
import About from "../sections/About/About";
import Banner from "../sections/Banner/Banner";
import Blog from "../sections/Blogs/Blog";
import Counter from "../sections/Counter/Counter";
import Footer from "../sections/Footer/Footer";
import Section from "../sections/Portfolio/Section";
import ServiceList from "../sections/Service/ServiceList";
import Skill from "../sections/Skill/Skill";
import Testimonials from "../sections/Testimonial/Testimonials";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Banner />
      <About />
      <Skill />
      <Counter />
      <ServiceList name="naviagate-to-services" />
      <Section name="naviagate-to-portfolio" />
      <Testimonials name="naviagate-to-testimonial" />
      <Blog name="naviagate-to-blog" />
      <Footer name="naviagate-to-contact" />
    </>
  );
}
