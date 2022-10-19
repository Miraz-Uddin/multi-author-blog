import React from "react";

export default function AboutLoading({ message }) {
  return (
    <div className="row">
      <div className="col-md-12 col-lg-12">
        <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
          <h2 className="title text-uppercase">{message}</h2>
        </div>
      </div>
    </div>
  );
}
