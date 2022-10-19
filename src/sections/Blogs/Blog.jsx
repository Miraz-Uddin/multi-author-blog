import moment from "moment/moment";
import React from "react";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../../features/blog/blogAPI";
import Author from "./Author";
import BlogHead from "./BlogHead";
import BlogLoading from "./BlogLoading";
import CommonBlogMessages from "./CommonBlogMessages";

export default function Blog() {
  const {
    data: blogs,
    isLoading,
    hasError,
  } = useGetBlogsQuery({ tags: null, monthYear: null });
  // decide what to render
  let content;
  if (isLoading) content = <BlogLoading />;
  // content = <CommonBlogMessages message={"All Blogs Loading ..."} />;
  if (!isLoading && hasError)
    content = <CommonBlogMessages message={"Error while Fetching All Blogs"} />;
  if (!isLoading && !hasError && blogs?.data?.length === 0)
    content = <CommonBlogMessages message={"No Blogs Found"} />;
  if (!isLoading && !hasError && blogs?.data?.length > 0)
    content = blogs?.data
      .slice()
      .sort((a, b) => {
        return (
          new Date(b.attributes.publishedAt) -
          new Date(a.attributes.publishedAt)
        );
      })
      .filter((item, index) => index < 3)
      .map((blog) => {
        const {
          title,
          short_description,
          publishedAt,
          author,
          comments,
          image,
        } = blog?.attributes;
        const cmnts = comments?.data?.length;
        const commentsCount =
          cmnts < 10 ? (
            "0" + cmnts
          ) : cmnts < 100 ? (
            cmnts
          ) : (
            <>
              99
              <sup>+</sup>
            </>
          );
        const imageURL = image?.data?.attributes?.url;
        const blogImage =
          imageURL === undefined
            ? window.origin + "/images/blog/03.jpg"
            : imageURL.split("/")[0] === "uploads"
            ? process.env.REACT_APP_API_URL + imageURL
            : imageURL;
        return (
          <Link
            to={`/blogs/${blog.id}`}
            key={blog.id}
            className="col-md-12 col-lg-4"
          >
            <div className="blog_item">
              <div className="comments">
                <i className="fa fa-comment" aria-hidden="true"></i>
                <span className="color_white">{commentsCount}</span>
              </div>
              <div className="blog_img overlay_one">
                <img
                  src={blogImage}
                  alt="blog1"
                  style={{
                    maxHeight: "250px",
                    width: "auto",
                    margin: "auto",
                    display: "block",
                  }}
                />
              </div>
              <div className="blog_content bg_white color_secondery">
                <div>
                  {/* <button> */}
                  <h5
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
                    {title}
                  </h5>
                  {/* </button> */}
                </div>
                <p
                  className="mt_15 mb_30"
                  style={{
                    height: "110px",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: "4",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  {short_description}
                </p>

                <Author userId={author?.data?.id} />

                <div className="date float-right color_primary">
                  {moment(publishedAt).format("DD MMM 'YY")}
                </div>
              </div>
            </div>
          </Link>
        );
      });
  return (
    <section id="blog" className="py_80 bg_secondery full_row" name="blog">
      <div className="container">
        <div className="row">
          <BlogHead />
          <div className="col-md-12 col-lg-12">
            <div className="blog_grid_1 wow animated slideInUp">
              <div className="row">{content}</div>
              <div className="mx-auto text-center mt_60">
                {!isLoading && !hasError && blogs?.data?.length > 0 && (
                  <Link to={`/blogs`} className="btn btn-default">
                    View All Blogs
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
