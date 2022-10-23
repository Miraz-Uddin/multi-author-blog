import { useSnackbar } from "notistack";
import React from "react";
import ServiceItem from "./ServiceItem";

export default function LoadingOrError({ message, isError }) {
  const { enqueueSnackbar } = useSnackbar();
  if (isError)
    enqueueSnackbar(message, { variant: isError ? "error" : "info" });
  return (
    <>
      <div className="col-md-12 col-lg-12">
        <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
          <h2 className="title text-uppercase">
            <span className="line_double mx-auto color_default">services</span>
            what i do
          </h2>
          <span className="sub_title">
            Interdum a etiam sagittis vehicula porta. Massa felis eros quam
            blandit nulla dolor habitant. Ullamcorper quis ornare et proin
            pellentesque.
          </span>
        </div>
      </div>
      <div className="services_item1">
        <div className="col-md-12 col-lg-12">
          <div className="row">
            <ServiceItem
              item={{
                serial: 1,
                title: "N / A",
                short_description:
                  "Proin a ullamcorper et primis lobortis laoreet senectus. Vitae dignissim sollicitudin eleifend cursus tempus curabitur posuere nam arcu platea sodales.",
                icon_class: "FaChess",
              }}
            />
            <ServiceItem
              item={{
                serial: 2,
                title: "N / A",
                short_description:
                  "Proin a ullamcorper et primis lobortis laoreet senectus. Vitae dignissim sollicitudin eleifend cursus tempus curabitur posuere nam arcu platea sodales.",
                icon_class: "FaJenkins",
              }}
            />
            <ServiceItem
              item={{
                serial: 3,
                title: "N / A",
                short_description:
                  "Proin a ullamcorper et primis lobortis laoreet senectus. Vitae dignissim sollicitudin eleifend cursus tempus curabitur posuere nam arcu platea sodales.",
                icon_class: "FaCat",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
