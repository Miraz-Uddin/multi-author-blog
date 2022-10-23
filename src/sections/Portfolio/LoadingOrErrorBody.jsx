import { useSnackbar } from "notistack";
import React from "react";

export default function LoadingOrErrorBody({ message, isError }) {
  const { enqueueSnackbar } = useSnackbar();
  if (isError)
    enqueueSnackbar(message, { variant: isError ? "error" : "info" });
  return (
    <div className="col-md-12 col-lg-12">
      <div className="my_portfolio">
        <div className="row">
          <div className="col-md-12">
            <div className="filters mb_30 w-100 text-center">
              <ul className="filter-tabs mx-auto d-inline-block">
                <li>
                  <label>{message}</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
