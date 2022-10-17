import React from "react";
import { Link } from "react-router-dom";
import getMonthsList from "../../utils/getMonthsList";
import styles from "./blogCustom.module.css";

export default function Archives({ monthYearClicked, selectedMonthYear }) {
  const content = getMonthsList().map((el, i) => {
    return (
      <li
        key={i}
        onClick={() => monthYearClicked(el.formattedData, el.value)}
        className={`${
          selectedMonthYear === el.value ? styles.monthYearSelected : ""
        }`}
      >
        <Link className={`${styles.monthYear}`}>{el.value}</Link>
      </li>
    );
  });
  return (
    <div className="widget mb_60 d-inline-block p_30 bg_white primary_link full_row wow animated slideInUp">
      <h3 className="widget_title mb_30 text-capitalize d-flex justify-content-between">
        <span>Archives</span>
        <button
          className={`badge text-danger font-regular ${
            selectedMonthYear ? "" : "d-none"
          }`}
          style={{ background: "none", border: "none" }}
          type="button"
          onClick={() => monthYearClicked(null)}
        >
          Clear
        </button>
      </h3>
      <div className="archives">
        <ul>{content}</ul>
      </div>
    </div>
  );
}
