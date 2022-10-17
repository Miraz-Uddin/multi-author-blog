import React from "react";
import styles from "./testimonialCustom.module.css";
export default function NextArrow({ onClick }) {
  return (
    <button className={`${styles.button} ${styles.right}`} onClick={onClick}>
      <i className="fa fa-chevron-right"></i>
    </button>
  );
}
