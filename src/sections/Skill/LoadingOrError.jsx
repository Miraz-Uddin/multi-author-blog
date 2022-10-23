import { useSnackbar } from "notistack";
import React from "react";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

export default function LoadingOrError({ message, isError }) {
  const { enqueueSnackbar } = useSnackbar();
  if (isError)
    enqueueSnackbar(message, { variant: isError ? "error" : "info" });
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
            <h2 className="title text-uppercase">
              <span className="line_double mx-auto color_default">skill</span>
              Design Skill
            </h2>
            <span className="sub_title">
              Interdum a etiam sagittis vehicula porta. Massa felis eros quam
              blandit nulla dolor habitant. Ullamcorper quis ornare et proin
              pellentesque.
            </span>
          </div>
        </div>
      </div>
      <div className="my_skill">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <div className="about_myskill color_secondery wow animated slideInLeft">
              <h2 className="color_primary">{`Some talk about my professional design skill`}</h2>
              <p>
                {" "}
                At mattis condimentum leo cubilia dictumst purus cubilia nisl
                quisque lacus ultricies proin massa fermentum placerat sociosqu
                ornare felis ultricies taciti mauris. Tempor mi, cum a
                condimentum commodo bibendum risus mauris natoque molestie
                tellus. In iaculis ad augue gravida posuere. Lectus neque fames
                lacinia magnis primis. Dictumst torquent dictumst. Bibendum et
                rutrum feugiat fames interdum purus feugiat praesent Nunc
                vivamus habitant nam ultricies est. Massa amet cubilia, vitae
                nonummy nisl. Rutrum mus velit vivamus sapien est.{" "}
              </p>
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="skill-progress wow animated slideInRight">
              <LinearProgressWithLabel label={"N/A"} value={5} />
              <LinearProgressWithLabel label={"N/A"} value={10} />
              <LinearProgressWithLabel label={"N/A"} value={15} />
              <LinearProgressWithLabel label={"N/A"} value={10} />
              <LinearProgressWithLabel label={"N/A"} value={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
