import React from "react";
import PreLoader from "../../components/ui/PreLoader";
import { useGetFooterInfoQuery } from "../../features/footer/footerAPI";
import ContactForm from "./ContactForm";
import LoadingOrError from "./LoadingOrError";

export default function Footer() {
  const { data, isLoading, isError } = useGetFooterInfoQuery();
  let content;
  if (isLoading) content = <PreLoader />;
  if (!isLoading && isError)
    content = (
      <LoadingOrError
        isError={true}
        message={"Error while fetching Footer Data"}
      />
    );
  if (!isLoading && !isError) {
    const {
      section,
      title,
      subtitle,
      email,
      phone,
      address,
      website_domain,
      facebook_url,
      twitter_url,
      google_plus_url,
      linkedin_url,
      instagram_url,
    } = data?.data?.attributes;
    content = (
      <>
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
        <div className="col-md-12 col-lg-12">
          <div className="row">
            <div className="col-md-4 col-lg-4">
              <div className="contact_info wow animated fadeInLeft">
                <ul>
                  <li>
                    <div className="contact_text">
                      <h6 className="font-weight-bold color_primary">Email</h6>
                      <span className="color_secondery">{email}</span>
                    </div>
                  </li>
                  <li>
                    <div className="contact_text">
                      <h6 className="font-weight-bold color_primary">Phone</h6>
                      <span className="color_secondery">{phone}</span>
                    </div>
                  </li>
                  <li>
                    <div className="contact_text">
                      <h6 className="font-weight-bold color_primary">
                        Address
                      </h6>
                      <span className="color_secondery">{address}</span>
                    </div>
                  </li>
                  <li>
                    <div className="contact_text">
                      <h6 className="font-weight-bold color_primary">
                        Website
                      </h6>
                      <span className="color_secondery">{website_domain}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="socal_media_2 mt_15 d-inline-block">
                <ul>
                  <li>
                    <a
                      href={
                        facebook_url ? facebook_url : "https://www.facebook.com"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href={twitter_url ? twitter_url : "https://twitter.com"}>
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={
                        google_plus_url
                          ? "mailto:" + google_plus_url
                          : "https://www.google.com/account"
                      }
                    >
                      <i className="fa fa-google-plus" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={
                        linkedin_url ? linkedin_url : "https://www.linkedin.com"
                      }
                    >
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={
                        instagram_url
                          ? instagram_url
                          : "https://www.instagram.com"
                      }
                    >
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
  return (
    <section id="contact" className="py_80 full_row bg_white" name="contact">
      <div className="container">
        <div className="row">{content}</div>
      </div>
    </section>
  );
}
