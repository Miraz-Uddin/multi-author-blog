import React from "react";
import NextArrow from "./NextArrow";
import PreviousArrow from "./PreviousArrow";

const settings = {
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PreviousArrow />,
  autoplay: true,
  dots: false,
  slidesToShow: 2,
  slidesToScroll: 1,
  speed: 1000,
  swipeToSlide: true,
  touchThreshold: 100,
  responsive: [
    {
      breakpoint: 1551,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1451,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
export default settings;
