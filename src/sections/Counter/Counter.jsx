import React from "react";
import CountUp from "react-countup";
import { useGetCounterQuery } from "../../features/counter/counterAPI";
import LoadingOrError from "./LoadingOrError";

export default function Counter() {
  let content;
  const { data: counter, isLoading, isError } = useGetCounterQuery();
  if (isLoading)
    content = <LoadingOrError message="Counter Data Loading ..." />;
  if (!isLoading && isError)
    content = (
      <LoadingOrError
        isError={true}
        message="Error while fetching Counter Data"
      />
    );
  if (!isLoading && !isError) {
    const { years_of_experience, projects_done, happy_clients } =
      counter?.data?.attributes;
    content = (
      <>
        <div className="col-md-4 col-lg-4">
          <div
            className="counter count wow text-center"
            data-wow-duration="300ms"
          >
            <span className="flaticon-man-working-on-a-laptop-from-side-view"></span>
            <div className="counting_digit color_default mt_15">
              <h2 className="count-num">
                {<CountUp end={years_of_experience} />}
                <span>+</span>
              </h2>
            </div>
            <h3 className="color_white mt_15">Years of Experience</h3>
          </div>
        </div>
        <div className="col-md-4 col-lg-4">
          <div
            className="counter count wow text-center"
            data-wow-duration="300ms"
          >
            <span className="flaticon-half-time-work"></span>
            <div className="counting_digit color_default mt_15">
              <h2 className="count-num">
                {<CountUp end={projects_done} />}
                <span>+</span>
              </h2>
            </div>
            <h3 className="color_white mt_15">Projects Done</h3>
          </div>
        </div>
        <div className="col-md-4 col-lg-4">
          <div
            className="counter count wow text-center"
            data-wow-duration="300ms"
          >
            <span className="flaticon-happy"></span>
            <div className="counting_digit color_default mt_15">
              <h2 className="count-num">
                {<CountUp end={happy_clients} />}
                <span>+</span>
              </h2>
            </div>
            <h3 className="color_white mt_15">Happy Clients</h3>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="experience background2 overlay_two py_60 full_row">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="fact-counter">
              <div className="row">{content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
