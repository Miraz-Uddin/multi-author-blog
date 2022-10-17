import moment from "moment/moment";
import React, { useEffect } from "react";
import Author from "./Author";
import styles from "./blogCustom.module.css";

export default function BlogItem({ info }) {
  const { title, short_description, publishedAt, author, comments, image } =
    info;
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="comments">
        <i className="fa fa-comment" aria-hidden="true"></i>
        <span className="color_white">{commentsCount}</span>
      </div>
      <div className="blog_img overlay_one">
        <img src={blogImage} alt="blog" className={styles.blogImage} />
      </div>
      <div className="blog_content bg_white">
        <div className="blog_title">
          <h5>{title}</h5>
        </div>
        <p className="mt_15 mb_30">{short_description}</p>
        <Author userId={author?.data?.id} />
        <div className="date float-right color_primary">
          {moment(publishedAt).format("DD MMMM YYYY")}
        </div>
      </div>
    </>
  );
}
