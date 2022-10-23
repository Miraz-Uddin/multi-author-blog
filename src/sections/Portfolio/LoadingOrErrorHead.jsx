import { useSnackbar } from "notistack";
import React from "react";

export default function LoadingOrErrorHead({ message, isError }) {
  const { enqueueSnackbar } = useSnackbar();
  if (isError)
    enqueueSnackbar(message, { variant: isError ? "error" : "info" });
  return (
    <>
      <h2 className="title text-uppercase">
        <span className="line_double mx-auto color_default">portfolio</span>
        recent projects
      </h2>
      <span className="sub_title">
        Interdum a etiam sagittis vehicula porta. Massa felis eros quam blandit
        nulla dolor habitant. Ullamcorper quis ornare et proin pellentesque.
      </span>
    </>
  );
}
