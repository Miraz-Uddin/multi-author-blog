import React from "react";
import { useGetProfileQuery } from "../../features/profile/profileAPI";

export default function Author({ userId, color = "color_white" }) {
  const { data: profile } = useGetProfileQuery(userId);
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
    <div className="admin">
      <img src={authorImage} alt="author" />
      <span className={color}>By - {authorName}</span>
    </div>
  );
}
