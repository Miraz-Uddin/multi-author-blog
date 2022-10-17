import React, { useEffect } from "react";
import About from "../sections/About";
import Blog from "../sections/Blogs/Blog";
import Contact from "../sections/Contact";
import Experience from "../sections/Experience";
import MainBanner from "../sections/MainBanner";
import Section from "../sections/Portfolio/Section";
import Service from "../sections/Service";
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
      <Experience />
      <Service />
      <Section />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}
