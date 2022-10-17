import React from "react";

export default function CommonBlogMessages({ message }) {
  return (
    <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInRight">
      <h2 className="title text-uppercase">
        <span className="line_double mx-auto color_default">{message}</span>
      </h2>
    </div>
  );
}
