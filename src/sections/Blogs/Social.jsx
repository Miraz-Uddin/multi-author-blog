import React from "react";
import { useGetProfileQuery } from "../../features/profile/profileAPI";

export default function Social({ blogAuthor }) {
  const { data: profile } = useGetProfileQuery(blogAuthor?.data?.id);
  const { facebook, twitter, user, linkedin, instagram } =
    profile?.data?.[0].attributes || {};
  const authorEmail = user?.data?.attributes?.email;
  return (
    <div className="widget mb_60 d-inline-block p_30 bg_white full_row wow animated slideInUp">
      <h3 className="widget_title mb_30 text-capitalize">Follow Me</h3>
      <div className="socal_media">
        <ul>
          <li>
            <a
              href={facebook ? facebook : "https://www.facebook.com"}
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href={twitter ? twitter : "https://twitter.com"}>
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a
              href={
                authorEmail
                  ? "mailto:" + authorEmail
                  : "https://www.google.com/account"
              }
            >
              <i className="fa fa-google-plus" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href={linkedin ? linkedin : "https://www.linkedin.com"}>
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href={instagram ? instagram : "https://www.instagram.com"}>
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
