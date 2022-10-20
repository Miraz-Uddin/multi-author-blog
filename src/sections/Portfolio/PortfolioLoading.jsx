import React from "react";

export default function PortfolioLoading({ message }) {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="filters mb_30 w-100 text-center">
          <ul className="filter-tabs mx-auto d-inline-block">
            <li>{message}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
