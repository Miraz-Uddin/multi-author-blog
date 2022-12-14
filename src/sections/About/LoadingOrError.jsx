import { useSnackbar } from "notistack";
import React from "react";

export default function LoadingOrError({ message, isError }) {
  const { enqueueSnackbar } = useSnackbar();
  if (isError)
    enqueueSnackbar(message, { variant: isError ? "error" : "info" });
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
            <h2 className="title text-uppercase">
              <span className="line_double mx-auto color_default">about</span>
              about myself
            </h2>
            <span className="sub_title">
              Interdum a etiam sagittis vehicula porta. Massa felis eros quam
              blandit nulla dolor habitant. Ullamcorper quis ornare et proin
              pellentesque.
            </span>
          </div>
        </div>
      </div>
      <div className="about_one">
        <div className="row">
          <div className="col-md-7 col-lg-7">
            <div className="myself color_secondery wow animated fadeInLeft">
              <p>
                Sodales iaculis est Scelerisque sociis magna dolor pulvinar
                magnis. Varius praesent suscipit. Donec morbi feugiat placerat
                gravida porttitor natoque nonummy parturient posuere. Magnis
                suspendisse parturient. Magna ultricies nostra nunc magna.
                Sodales etiam arcu suscipit, mollis. Aenean tempor eu ipsum nisi
                sociosqu lorem hymenaeos sapien. Aptent maecenas ac ante
                molestie habitant. Duis vulputate nisi nam sem penatibus
                parturient volutpat justo phasellus. Netus. Hac montes tempor
                lorem tempor tincidunt vehicula velit. Tellus. Class aenean leo
                elit maecenas. Vehicula sagittis. Curae; eget lacus. Fames neque
                diam elementum risus eleifend dui tortor netus turpis.
              </p>
            </div>
            <div className="personal_info">
              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <ul>
                    <li>
                      <span className="color_secondery">Name :</span> Nobody
                    </li>
                    <li>
                      <span className="color_secondery">Email :</span>{" "}
                      emai@example.com
                    </li>
                    <li>
                      <span className="color_secondery">Phone :</span> +12 23
                      456 789
                    </li>
                  </ul>
                </div>
                <div className="col-md-12 col-lg-6">
                  <ul>
                    <li>
                      <span className="color_secondery">Date of Birth :</span>{" "}
                      29 February 1971
                    </li>
                    <li>
                      <span className="color_secondery">Blood Group :</span> N/A
                    </li>
                    <li>
                      <span className="color_secondery">Address :</span> N/A
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-lg-5">
            <div className="profile_img personal_video wow animated fadeInRight">
              <img src={window.origin + "/images/about/03.png"} alt="about1" />
              <div className="iconround">
                <a
                  className="about-video"
                  data-vbtype="video"
                  href={"https://vimeo.com/134660574"}
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
