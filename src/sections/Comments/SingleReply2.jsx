import moment from "moment/moment";
import React from "react";
import { useGetProfileQuery } from "../../features/profile/profileAPI";
import styles from "../Blogs/blogCustom.module.css";

export default function SingleReply2({ comment, commentId }) {
  const { message, createdAt, user } = comment?.attributes || {};

  const { data: profile } = useGetProfileQuery(user?.data?.id);
  let authorImage = window.origin + "/images/author/user.jpg";
  let authorName;
  if (profile) {
    const imageURL =
      profile?.data?.[0]?.attributes?.avatar?.data?.attributes?.url;
    authorName = profile?.data?.[0]?.attributes?.fullname;
    authorImage =
      imageURL === undefined
        ? window.origin + "/images/author/user.jpg"
        : imageURL.split("/")[0] === "uploads"
        ? process.env.REACT_APP_API_URL + imageURL
        : imageURL;
  }

  return (
    <li className="mb_20 wow animated slideInUp">
      <div className={`replied2 comment_description bg_white p_20`}>
        <div className="author_img">
          <img src={authorImage} alt="images" />
        </div>
        <div className="author_text">
          <div className={`${styles.commentHead} author_info ml-5`}>
            <h5 className="author_name color_primary">{authorName}</h5>
            <span>
              {/* {moment(createdAt).format("DD MMMM, YYYY") +
                " at " +
                moment(createdAt).format("h.mm a")} */}
              {moment(createdAt).fromNow()}
            </span>
          </div>
          <p className="ml-5">{message}</p>
        </div>
      </div>
    </li>
  );
}
