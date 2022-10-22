import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animateScroll as scroll } from "react-scroll";
import { themeChange } from "../../features/theme/themeSlice";
import changeColor from "../../utils/changeColor";

export default function ThemeChanger() {
  const {
    bgWhite,
    bgAdmin,
    pureWhite,
    bgSecondary,
    textColor,
    colorPrimary,
    colorSecondery,
    boxShadow,
  } = useSelector((state) => state.theme) || {};
  const dispatch = useDispatch();
  const [mode, setMode] = useState("dark");
  const changeMode = () => {
    let whiteColor;
    let adminColor;
    let whitePure;
    let secondaryColor;
    let textPrimaryColor;
    let primaryColor;
    let seconderyColor;
    let shadowBox;
    if (mode === "dark") {
      whiteColor = "#1e283c";
      adminColor = "rgb(28 37 54)";
      secondaryColor = "rgb(28 37 54)";
      textPrimaryColor = primaryColor = seconderyColor = whitePure = "#fff";
      shadowBox = "1px 2px 8px rgb(255 255 255 / 18%)";
      setMode("normal");
    } else {
      whiteColor = whitePure = "#fff";
      adminColor = "#1e283c";
      secondaryColor = "#f7f7f7";
      textPrimaryColor = "#212529";
      primaryColor = "#1e283c";
      seconderyColor = "#818181";
      shadowBox = "1px 2px 10px rgb(0 0 0 / 18%)";
      setMode("dark");
    }
    dispatch(
      themeChange({
        bgWhite: whiteColor,
        bgAdmin: adminColor,
        pureWhite: whitePure,
        bgSecondary: secondaryColor,
        textColor: textPrimaryColor,
        colorPrimary: primaryColor,
        colorSecondery: seconderyColor,
        boxShadow: shadowBox,
      })
    );
  };

  const handleScroll = (evt) => {
    const scrolledValue = window.scrollY;
    if (scrolledValue >= 600) {
      document.querySelector(".scrollToTop").classList.add("visible");
    } else {
      document.querySelector(".scrollToTop").classList.remove("visible");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    changeColor(".bg_secondery", bgSecondary, "backgroundColor");
    changeColor(".bg_white", bgWhite, "backgroundColor");
    changeColor(".admin", bgAdmin, "backgroundColor");
    changeColor(".admin span.color_primary", pureWhite);
    changeColor(".service_two", boxShadow, "boxShadow");
    changeColor(".blog_item", boxShadow, "boxShadow");
    changeColor(".member_feedback", boxShadow, "boxShadow");
    changeColor(".blog_item", boxShadow, "boxShadow");
    changeColor(".service_two > p", textColor);
    changeColor("h2.title", textColor);
    changeColor("h2.color_primary", textColor);
    changeColor(".service_two > h3", textColor);
    changeColor("span.sub_title", textColor);
    changeColor(".prgs-bar span", textColor);
    changeColor(".prgs-bar .skill-percent", textColor);
    changeColor("li.filter", textColor);
    changeColor(".blog_content > p", textColor);
    changeColor("li.filter>a", textColor);
    changeColor("h5", colorPrimary);
    changeColor("h6", colorPrimary);
    changeColor(".date", colorPrimary);
    changeColor(".comments > span", colorPrimary);
    changeColor(".color_secondery", colorSecondery);
    changeColor(".socal_media_2 i.fa", textColor);
    changeColor(".share_post > h4", textColor);
    changeColor(".comment_area > h4", textColor);
    changeColor(".replay > h4", textColor);
    changeColor(".author_text > p", textColor);
    changeColor(".author_text span", textColor);
    changeColor(".copyright span", textColor);
    changeColor(".widget_title", textColor);
    changeColor("blockquote", colorSecondery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <>
      <div className="color-panel">
        <div
          className="on-panel"
          style={{
            color: `${mode === "normal" ? "#1e283c" : "#fff"}`,
            backgroundColor: `${mode === "normal" ? "#fff" : "#1e283c"}`,
          }}
        >
          <div className="text-center icon-spinner" onClick={changeMode}>
            <i
              className={`fa ${
                mode === "normal" ? "fa-sun-o" : "fa-moon-o"
              } fa-3x fa-fw`}
            ></i>
          </div>
        </div>
        <div className="panel-box">
          <span className="panel-title"></span>
        </div>
      </div>
      <span
        className="scrollToTop"
        onClick={() => scroll.scrollToTop()}
        style={{
          color: `${mode === "normal" ? "#1e283c" : "#fff"}`,
          backgroundColor: `${mode === "normal" ? "#fff" : "#1e283c"}`,
        }}
      >
        <i
          className="fa fa-arrow-up"
          style={{ color: `${mode === "normal" ? "#1e283c" : "#fff"}` }}
        ></i>
      </span>
    </>
  );
}
