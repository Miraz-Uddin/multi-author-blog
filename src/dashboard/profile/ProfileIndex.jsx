import moment from "moment/moment";
import React from "react";
import { Link } from "react-router-dom";
import PreLoader from "../../components/ui/PreLoader";
import styles from "./profileCustom.module.css";
import ProfileInfo from "./ProfileInfo";

export default function ProfileIndex({ profile, profileId }) {
  if (profile) {
    const {
      user,
      avatar,
      address,
      facebook,
      instagram,
      twitter,
      linkedin,
      dateofbirth,
    } = profile || {};
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
              <ProfileInfo
                label="Email"
                value={user?.data?.attributes?.email}
              />
              <ProfileInfo
                label="Birthday"
                value={moment(dateofbirth).format("Do MMMM,  YYYY")}
              />
              <ProfileInfo label="Facebook" value={facebook ?? "N/A"} />
              <ProfileInfo label="Twitter" value={twitter ?? "N/A"} />
              <ProfileInfo label="Linkedin" value={linkedin ?? "N/A"} />
              <ProfileInfo label="Instagram" value={instagram ?? "N/A"} />
              <div className="mb-2">
                <label className={`${styles.textareaLabel}`}>Address:</label>
                <textarea
                  className={`${styles.textarea}`}
                  disabled
                  defaultValue={address ?? "N/A"}
                ></textarea>
              </div>
            </div>
            <span className={`${styles.profileInfoEdit}`}>
              <Link
                to={`/dashboard/profile/${profileId}/edit`}
                className={`${styles.profileInfoEditBtn} btn btn-info`}
              >
                Edit
              </Link>
            </span>
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
