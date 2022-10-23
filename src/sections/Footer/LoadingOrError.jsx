import { useSnackbar } from "notistack";
import React from "react";
import ContactForm from "./ContactForm";

export default function LoadingOrError({ message, isError }) {
  const { enqueueSnackbar } = useSnackbar();
  if (isError)
    enqueueSnackbar(message, { variant: isError ? "error" : "info" });
  return (
    <>
      <div className="col-md-12 col-lg-12">
        <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
          <h2 className="title text-uppercase">
            <span className="line_double mx-auto color_default">contact</span>
            Get In Touch
          </h2>
          <span className="sub_title">
            Interdum a etiam sagittis vehicula porta. Massa felis eros quam
            blandit nulla dolor habitant. Ullamcorper quis ornare et proin
            pellentesque.
          </span>
        </div>
      </div>
      <div className="col-md-12 col-lg-12">
        <div className="row">
          <div className="col-md-4 col-lg-4">
            <div className="contact_info wow animated fadeInLeft">
              <ul>
                <li>
                  <div className="contact_text">
                    <h6 className="font-weight-bold color_primary">Email</h6>
                    <span className="color_secondery">
                      yourdomainname@gmail.com
                    </span>
                  </div>
                </li>
                <li>
                  <div className="contact_text">
                    <h6 className="font-weight-bold color_primary">Phone</h6>
                    <span className="color_secondery">+12 34 567 890</span>
                  </div>
                </li>
                <li>
                  <div className="contact_text">
                    <h6 className="font-weight-bold color_primary">Address</h6>
                    <span className="color_secondery">N/A</span>
                  </div>
                </li>
                <li>
                  <div className="contact_text">
                    <h6 className="font-weight-bold color_primary">Website</h6>
                    <span className="color_secondery">N/A</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="socal_media_2 mt_15 d-inline-block">
              <ul>
                <li>
                  <a
                    href={"https://www.facebook.com"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href={"https://twitter.com"}>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href={"https://www.google.com/account"}>
                    <i className="fa fa-google-plus" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href={"https://www.linkedin.com"}>
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href={"https://www.instagram.com"}>
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
