import React from "react";
import { useGetBlogHeadQuery } from "../../features/blog/blogAPI";
import LoadingOrErrorHead from "./LoadingOrErrorHead";

export default function BlogHead() {
  const { data, isLoading, isError } = useGetBlogHeadQuery();
  let content;
  if (isLoading)
    content = <LoadingOrErrorHead message="Blog Headline Loading ..." />;
  if (!isLoading && isError)
    content = (
      <LoadingOrErrorHead
        isError={true}
        message="Newtowk Error while fetching Blog Headline"
      />
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
