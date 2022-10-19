import React, { useEffect } from "react";
import Venobox from "venobox";
import AboutLoading from "./AboutLoading";

import { useGetAboutQuery } from "../../features/about/aboutAPI";

export default function About() {
  const { data: about, isLoading, hasError } = useGetAboutQuery();
  useEffect(() => {
    new Venobox({
      autoplay: false,
      spinner: "wave",
      selector: ".about-video",
    });
  }, [about]);
  // decide what to render
  let content;
  if (isLoading)
    content = <AboutLoading message="About Information Loading ..." />;
  if (!isLoading && hasError)
    content = <AboutLoading message="Error while fetching About Information" />;
  if (!isLoading && !hasError) {
    const {
      section,
      title,
      subtitle,
      description,
      name,
      email,
      phone,
      date_of_birth,
      blood_group,
      address,
      featured_image,
      featured_video_url,
    } = about?.data?.attributes;
    const imageURL = featured_image?.data?.attributes?.url;
    const aboutImage =
      imageURL === undefined
        ? window.origin + "/images/about/03.png"
        : imageURL.split("/")[0] === "uploads"
        ? process.env.REACT_APP_API_URL + imageURL
        : imageURL;
    content = (
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
              <h2 className="title text-uppercase">
                <span className="line_double mx-auto color_default">
                  {section}
                </span>
                {title}
              </h2>
              <span className="sub_title">{subtitle}</span>
            </div>
          </div>
        </div>
        <div className="about_one">
          <div className="row">
            <div className="col-md-7 col-lg-7">
              <div className="myself color_secondery wow animated fadeInLeft">
                <p>{description}</p>
              </div>
              <div className="personal_info">
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <ul>
                      <li>
                        <span className="color_secondery">Name :</span> {name}
                      </li>
                      <li>
                        <span className="color_secondery">Email :</span> {email}
                      </li>
                      <li>
                        <span className="color_secondery">Phone :</span> {phone}
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <ul>
                      <li>
                        <span className="color_secondery">Date of Birth :</span>{" "}
                        {date_of_birth}
                      </li>
                      <li>
                        <span className="color_secondery">Blood Group :</span>{" "}
                        {blood_group}
                      </li>
                      <li>
                        <span className="color_secondery">Address :</span>{" "}
                        {address}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-lg-5">
              <div className="profile_img personal_video wow animated fadeInRight">
                <img src={aboutImage} alt="about1" />
                <div className="iconround">
                  <a
                    className="about-video"
                    data-vbtype="video"
                    href={featured_video_url}
                  >
                    <i className="fa fa-play" aria-hidden="true"></i>
                  </a>
                </div>
                <div className="loader">
                  <div className="loader-inner ball-scale-multiple">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="about" className="py_80 full_row bg_white" name="about">
      {content}
    </section>
  );
}
