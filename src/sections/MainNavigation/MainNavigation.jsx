import { useSnackbar } from "notistack";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as Scroll from "react-scroll";
import { animateScroll as scroll, Link as ReactScroll } from "react-scroll";
import { useGetHeaderInfoQuery } from "../../features/head/headAPI";

export default function MainNavigation() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.auth) || {};
  let content;
  const { data, isLoading, isError } = useGetHeaderInfoQuery();
  if (isLoading || (!isLoading && isError))
    content = (
      <img
        className="nav-logo"
        src={window.origin + "/images/logo/1.png"}
        alt="logo"
      />
    );
  if (!isLoading && !isError) {
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

  const goToHomeAndScroll = async (e) => {
    if (path !== "/") {
      await navigate("/");
      const el = document.querySelectorAll(".nav-link");
      const arr = Array.prototype.slice.call(el);
      arr.map((el) => {
        if (e.target.innerHTML === el.innerHTML) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
        return el;
      });
    } else {
      const el = document.querySelectorAll(".nav-link");
      const arr = Array.prototype.slice.call(el);
      arr.map((el) => {
        if (e.target.innerHTML === el.innerHTML) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
        return el;
      });
    }
    await scroller.scrollTo(e?.target?.innerHTML?.toLowerCase(), {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50,
    });
  };

  const checkLoggedIn = () => {
    if (!user) {
      enqueueSnackbar("Please Log in to access", { variant: "info" });
      const el = document.querySelectorAll(".nav-link.active");
      const arr = Array.prototype.slice.call(el);
      arr.map((el) => el.classList.remove("active"));
    } else {
      const el = document.querySelectorAll(".nav-link.active");
      const arr = Array.prototype.slice.call(el);
      arr.map((el) => el.classList.remove("active"));
    }
  };

  const clickedHome = async (e) => {
    if (path !== "/") {
      await navigate("/");
    }
    scroll.scrollToTop();
    const el = document.querySelectorAll(".nav-link");
    const arr = Array.prototype.slice.call(el);
    arr.map((el) => {
      if ("Home" === el.innerHTML) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
      return el;
    });
  };
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
            offset={-72}
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
              <>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <ReactScroll
                      to={"homes"}
                      spy={true}
                      smooth={true}
                      offset={0}
                      duration={500}
                      className="nav-link"
                      onClick={clickedHome}
                    >
                      Home
                    </ReactScroll>
                  </li>
                  <li className="nav-item">
                    <ReactScroll
                      activeClass="active"
                      to="naviagate-to-about"
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
                      to="naviagate-to-skill"
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
                      to="naviagate-to-services"
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
                  <li className="nav-item port-hide">
                    <ReactScroll
                      activeClass="active"
                      to="naviagate-to-portfolio"
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
                      to="naviagate-to-testimonial"
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
                      to="naviagate-to-blog"
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
                      to="naviagate-to-contact"
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
                  {/* <li className="nav-item">
                  <Link
                    to={`/dashboard`}
                    className="nav-link"
                    onClick={checkLoggedIn}
                  >
                    Dashboard
                  </Link>
                </li> */}
                </ul>
                <ul>
                  <li className="nav-item dash">
                    <NavLink
                      to={`/dashboard`}
                      className="nav-link"
                      onClick={checkLoggedIn}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                </ul>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
