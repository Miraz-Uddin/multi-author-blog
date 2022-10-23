import moment from "moment/moment";
import React from "react";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../../features/blog/blogAPI";
import BlogLoading from "./BlogLoading";

export default function RecentPost() {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useGetBlogsQuery({ tags: null, monthYear: null });

  // decide what to render
  let content;
  if (isLoading) content = <BlogLoading />;
  if (!isLoading && isError) content = <span>No Blogs Found</span>;
  if (!isLoading && !isError && blogs.data?.length === 0)
    content = <span>No Blogs Found</span>;
  if (!isLoading && !isError && blogs.data?.length > 0) {
    content = blogs?.data
      .slice()
      .sort((a, b) => {
        return (
          new Date(b.attributes.publishedAt) -
          new Date(a.attributes.publishedAt)
        );
      })
      .filter((item, index) => index < 5)
      .map((blog) => {
        const imageURL = blog?.attributes?.image?.data?.attributes?.url;
        const blogImage =
          imageURL === undefined
            ? window.origin + "/images/blog/03.jpg"
            : imageURL.split("/")[0] === "uploads"
            ? process.env.REACT_APP_API_URL + imageURL
            : imageURL;
        return (
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <li className="mb_30">
              <span>
                <div className="post_img">
                  <img src={blogImage} alt="post1" />
                </div>
                <div className="recent_post_content">
                  <h6
                    style={{
                      height: "38px",
                      lineHeight: "18px",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: "2",
                      overflow: "hidden",
                      marginBottom: "4px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {blog?.attributes?.title}
                  </h6>
                  <span className="color_gray">
                    {moment(blog?.attributes?.publishedAt).format(
                      "DD MMM YYYY"
                    )}
                  </span>
                </div>
              </span>
            </li>
          </Link>
        );
      });
  }
  return (
    <div className="widget mb_60 d-inline-block p_30 primary_link bg_white full_row wow animated slideInUp">
      <h3 className="widget_title mb_30 text-capitalize">Recent Post</h3>
      <div className="recent_post">
        <ul>{content}</ul>
      </div>
    </div>
  );
}
