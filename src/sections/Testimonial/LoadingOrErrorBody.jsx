import { useSnackbar } from "notistack";
import React from "react";
import Slider from "react-slick";
import Client from "./Client";
import settings from "./settings";

export default function LoadingOrErrorBody({ message, isError }) {
  const { enqueueSnackbar } = useSnackbar();
  if (isError)
    enqueueSnackbar(message, { variant: isError ? "error" : "info" });
  return (
    <Slider {...settings}>
      {[...Array(5)].map((testimonial, i) => (
        <Client
          key={i}
          client={{
            client_rating: 5,
            client_name: "N/A",
            client_review: `Sem duis platea erat feugiat vivamus nascetur sapien tortor. Sollic dictum ultric. Aliquam inceptos bibendum fringilla sodales. Molest lacin urna per aenean commodo sociosqu.`,
            client_image: `${window.origin + "/images/testimonial/02.jpg"}`,
          }}
        />
      ))}
    </Slider>
  );
}
