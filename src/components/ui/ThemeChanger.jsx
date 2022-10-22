import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeChange } from "../../features/theme/themeSlice";

export default function ThemeChanger() {
  const { bgWhite, bgSecondary, textColor, colorPrimary } =
    useSelector((state) => state.theme) || {};
  const dispatch = useDispatch();
  const [mode, setMode] = useState("dark");
  const changeMode = () => {
    let whiteColor;
    let secondaryColor;
    let textPrimaryColor;
    let primaryColor;
    if (mode === "dark") {
      whiteColor = "#1e283c";
      secondaryColor = "#1e283c";
      textPrimaryColor = "#fff";
      primaryColor = "#fff";
      setMode("normal");
    } else {
      whiteColor = "#fff";
      secondaryColor = "#f7f7f7";
      textPrimaryColor = "#212529";
      primaryColor = "#1e283c";
      setMode("dark");
    }
    dispatch(
      themeChange({
        bgWhite: whiteColor,
        bgSecondary: secondaryColor,
        textColor: textPrimaryColor,
        colorPrimary: primaryColor,
      })
    );
  };

  useEffect(() => {
    let link1 = document.querySelectorAll(".bg_secondery");
    const links1 = Array.prototype.slice.call(link1);
    links1.map((el) => (el.style.backgroundColor = bgSecondary));
    let link2 = document.querySelectorAll(".bg_white");
    const links2 = Array.prototype.slice.call(link2);
    links2.map((el) => (el.style.backgroundColor = bgWhite));
    let link3 = document.querySelectorAll("p");
    const links3 = Array.prototype.slice.call(link3);
    links3.map((el) => (el.style.color = textColor));
    let link4 = document.querySelectorAll("h2");
    const links4 = Array.prototype.slice.call(link4);
    links4.map((el) => (el.style.color = textColor));
    let link5 = document.querySelectorAll("span");
    const links5 = Array.prototype.slice.call(link5);
    links5.map((el) => (el.style.color = textColor));
    let link6 = document.querySelectorAll("label");
    const links6 = Array.prototype.slice.call(link6);
    links6.map((el) => (el.style.color = textColor));
    let link7 = document.querySelectorAll(".service_two");
    const links7 = Array.prototype.slice.call(link7);
    links7.map((el) => (el.style.boxShadow = `1px 2px 8px ${textColor}`));
    let link8 = document.querySelectorAll("h6");
    const links8 = Array.prototype.slice.call(link8);
    links8.map((el) => (el.style.color = colorPrimary));
    let link9 = document.querySelectorAll("h5");
    const links9 = Array.prototype.slice.call(link9);
    links9.map((el) => (el.style.color = colorPrimary));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
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
  );
}
