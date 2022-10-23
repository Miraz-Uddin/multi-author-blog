import { useSnackbar } from "notistack";
import React from "react";

export default function LoadingOrError({ message, isError }) {
  const { enqueueSnackbar } = useSnackbar();
  if (isError)
    enqueueSnackbar(message, { variant: isError ? "error" : "info" });
  return (
    <>
      <div className="col-md-4 col-lg-4">
        <div
          className="counter count wow text-center"
          data-wow-duration="300ms"
        >
          <span className="flaticon-man-working-on-a-laptop-from-side-view"></span>
          <div className="counting_digit color_default mt_15">
            <h2 className="count-num">
              N / <span>A</span>{" "}
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
              N / <span>A</span>{" "}
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
              N / <span>A</span>{" "}
            </h2>
          </div>
          <h3 className="color_white mt_15">Happy Clients</h3>
        </div>
      </div>
    </>
  );
}
