import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Scroll from "react-scroll";
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
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const scroller = Scroll.scroller;

  // const scrollToAnchor = async (e) => {
  //   await scroller.scrollTo(e.target.innerHTML.toLowerCase(), {
  //     duration: 1500,
  //     delay: 100,
  //     smooth: true,
  //     offset: 50,
  //   });
  // };

  const goToHomeAndScroll = async (e) => {
    // await closeMobile();

    if (path !== "/") {
      await navigate("/");
    }
    await scroller.scrollTo(e?.target?.innerHTML?.toLowerCase(), {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50,
    });
  };

  // const closeMobile = () => {};
  return (
    <header className="main_nav">
      <div className="container">
        <nav
          id="navbar-example2"
          className="navbar navbar-expand-lg navbar-light w-100"
        >
          <ReactScroll
            activeClass="active"
            to="home"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            className="navbar-brand"
            onClick={goToHomeAndScroll}
            style={{ cursor: "pointer" }}
          >
            {content}
          </ReactScroll>
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
            {location === "/" ? (
              <></>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <ReactScroll
                    activeClass="active"
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                    className="nav-link"
                    onClick={goToHomeAndScroll}
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
                    offset={0}
                    duration={500}
                    className="nav-link"
                    onClick={goToHomeAndScroll}
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
                    offset={0}
                    duration={500}
                    className="nav-link"
                    onClick={goToHomeAndScroll}
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
                    offset={0}
                    duration={500}
                    className="nav-link"
                    onClick={goToHomeAndScroll}
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
                    offset={0}
                    duration={500}
                    className="nav-link"
                    onClick={goToHomeAndScroll}
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
                    offset={0}
                    duration={500}
                    className="nav-link"
                    onClick={goToHomeAndScroll}
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
                    offset={0}
                    duration={500}
                    className="nav-link"
                    onClick={goToHomeAndScroll}
                  >
                    Contact
                  </ReactScroll>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
