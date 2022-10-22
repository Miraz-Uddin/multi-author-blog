import React from "react";
import { Link } from "react-router-dom";
import { Link as ReactScroll } from "react-scroll";
import { useGetHeaderInfoQuery } from "../../features/head/headAPI";

export default function MainNavigation() {
  let content;
  const { data, isLoading, hasError } = useGetHeaderInfoQuery();
  if (isLoading || (!isLoading && hasError))
    content = (
      <img
        className="nav-logo"
        src={window.origin + "/images/logo/1.png"}
        alt="logo"
      />
    );
  if (!isLoading && !hasError) {
    const { logo_white_bg } = data?.data?.attributes;
    const logoWhiteURL = logo_white_bg?.data?.attributes?.url;
    const logoWhiteImage =
      logoWhiteURL === undefined
        ? window.origin + "/images/logo/1.png"
        : logoWhiteURL.split("/")[0] === "uploads"
        ? process.env.REACT_APP_API_URL + logoWhiteURL
        : logoWhiteURL;
    // const { logo_transparent_bg } = data?.data?.attributes;
    // const logoTransparentURL = logo_transparent_bg?.data?.attributes?.url;
    // const logoTransparentImage =
    //   logoTransparentURL === undefined
    //     ? window.origin + "/images/logo/1.png"
    //     : logoWhiteURL.split("/")[0] === "uploads"
    //     ? process.env.REACT_APP_API_URL + logoTransparentURL
    //     : logoTransparentURL;
    content = <img className="nav-logo" src={logoWhiteImage} alt="logo" />;
  }
  return (
    <header className="main_nav">
      <div className="container">
        <nav
          id="navbar-example2"
          className="navbar navbar-expand-lg navbar-light w-100"
        >
          <Link to={`/`} className="navbar-brand">
            {content}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mainNavComponent"
            aria-controls="mainNavComponent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNavComponent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <ReactScroll
                  activeClass="active"
                  to="home"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  className="nav-link"
                >
                  Home
                </ReactScroll>
              </li>
              <li className="nav-item">
                <ReactScroll
                  activeClass="active"
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  className="nav-link"
                >
                  About
                </ReactScroll>
              </li>
              <li className="nav-item">
                <ReactScroll
                  activeClass="active"
                  to="skill"
                  spy={true}
                  smooth={true}
                  offset={-88}
                  duration={500}
                  className="nav-link"
                >
                  Skill
                </ReactScroll>
              </li>
              <li className="nav-item">
                <ReactScroll
                  activeClass="active"
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-72}
                  duration={500}
                  className="nav-link"
                >
                  Services
                </ReactScroll>
              </li>
              <li className="nav-item">
                <ReactScroll
                  activeClass="active"
                  to="portfolio"
                  spy={true}
                  smooth={true}
                  offset={-72}
                  duration={500}
                  className="nav-link"
                >
                  Portfolio
                </ReactScroll>
              </li>
              <li className="nav-item">
                <ReactScroll
                  activeClass="active"
                  to="testimonial"
                  spy={true}
                  smooth={true}
                  offset={-72}
                  duration={500}
                  className="nav-link"
                >
                  Testimonial
                </ReactScroll>
              </li>
              <li className="nav-item">
                <ReactScroll
                  activeClass="active"
                  to="blog"
                  spy={true}
                  smooth={true}
                  offset={-72}
                  duration={500}
                  className="nav-link"
                >
                  Blog
                </ReactScroll>
              </li>
              <li className="nav-item">
                <ReactScroll
                  activeClass="active"
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-72}
                  duration={500}
                  className="nav-link"
                >
                  Contact
                </ReactScroll>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
