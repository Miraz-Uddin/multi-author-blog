import Parser from "html-react-parser";
import moment from "moment/moment";
import React from "react";
import Comments from "../Comments/Comments";
import Author from "./Author";
import styles from "./blogCustom.module.css";

export default function SingleBlogDetails({ blog }) {
  if (blog) {
    const { title, long_description, publishedAt, author, comments, image } =
      blog?.data?.attributes;
    const cmnts = comments?.data?.length;
    const commentsCount =
      cmnts < 10 && cmnts > 0 ? (
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
      <>
        <div className="blog_img overlay_one wow animated slideInUp">
          <img src={blogImage} alt="blog" className={styles.blogImage} />
        </div>
        <div className="blog_content bg_white wow animated slideInUp">
          <div className="blog_title mb_20 color_primary">
            <h5>{title}</h5>
          </div>
          <Author userId={author?.data?.id} color="color_primary" />
          <div className="date color_primary float-left">
            {moment(publishedAt).format("DD MMM YYYY")}
          </div>
          <div className="comments">
            <i className="fa fa-comment" aria-hidden="true"></i>
            <span className="color_primary">{commentsCount}</span>
          </div>
        </div>
        <div className="bg_white" style={{ padding: "0 15px 30px" }}>
          <div className={`${styles.singleBlogContent}`}>
            {Parser(long_description)}
          </div>
          <div className="share_post mt_30 wow animated slideInUp">
            <h4 className="float-left mr_20">Share : </h4>
            <div className="socal_media_2 d-inline-block">
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://web.whatsapp.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-whatsapp" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://web.skype.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-skype" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com">
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Comments blog={blog?.data?.attributes} />
      </>
    );
  } else {
    return <span>Blog Information Loading ...</span>;
  }
}
