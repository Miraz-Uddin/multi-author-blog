import React from "react";
import PreLoader from "../../components/ui/PreLoader";
import Info from "./Info";

import styles from "./profileCustom.module.css";

export default function ProfileIndex({ profile }) {
  if (profile) {
    const { user, avatar, address, facebook, instagram, twitter, linkedin } =
      profile || {};
    let authorImage = window.origin + "/images/author/user.jpg";
    const imageURL = avatar?.data?.attributes?.url;
    authorImage =
      imageURL === undefined
        ? window.origin + "/images/author/user.jpg"
        : imageURL.split("/")[0] === "uploads"
        ? process.env.REACT_APP_API_URL + imageURL
        : imageURL;
    return (
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <div className="card">
            <div className="card-body">
              <Info label="Email" value={user?.data?.attributes?.email} />
              <Info label="Facebook" value={facebook ?? "N/A"} />
              <Info label="Twitter" value={twitter ?? "N/A"} />
              <Info label="Linkedin" value={linkedin ?? "N/A"} />
              <Info label="Instagram" value={instagram ?? "N/A"} />
              <div className="mb-2">
                <label className={`${styles.textareaLabel}`}>Address:</label>
                <textarea
                  className={`${styles.textarea}`}
                  disabled
                  defaultValue={address ?? "N/A"}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <img className="card-img-top" src={authorImage} alt="Cardcap" />
          </div>
        </div>
      </div>
    );
  } else {
    return <PreLoader />;
  }
}
