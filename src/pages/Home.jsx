import React, { useEffect } from "react";
import About from "../sections/About/About";
import Blog from "../sections/Blogs/Blog";
import Counter from "../sections/Counter/Counter";
import Footer from "../sections/Footer/Footer";
import MainBanner from "../sections/MainBanner";
// import Section from "../sections/Portfolio/Section";
import ServiceList from "../sections/Service/ServiceList";
import Skill from "../sections/Skill/Skill";
import Testimonials from "../sections/Testimonial/Testimonials";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <MainBanner />
      <About />
      <Skill />
      <Counter />
      <ServiceList />
      {/* <Section /> */}
      <Testimonials />
      <Blog />
      <Footer />
    </>
  );
}
