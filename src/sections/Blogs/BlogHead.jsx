import React from "react";
import { useGetBlogHeadQuery } from "../../features/blog/blogAPI";

export default function BlogHead() {
  const { data, isLoading, isError } = useGetBlogHeadQuery();
  let content;
  if (isLoading)
    content = <h2 className="title text-uppercase">Blog Head Loading ...</h2>;
  if (!isLoading && isError)
    content = (
      <h2 className="title text-uppercase">Error while fetching Blog Head</h2>
    );
  if (!isLoading && !isError) {
    const { section, title, subtitle } = data?.data?.attributes;
    content = (
      <>
        <h2 className="title text-uppercase">
          <span className="line_double mx-auto color_default">{section}</span>
          {title}
        </h2>
        <span className="sub_title">{subtitle}</span>
      </>
    );
  }
  return (
    <div className="col-md-12 col-lg-12">
      <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
        {content}
      </div>
    </div>
  );
}
