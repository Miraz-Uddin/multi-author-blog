import React from "react";
import styles from "./testimonialCustom.module.css";
export default function PreviousArrow({ onClick }) {
  return (
    <button className={`${styles.button} ${styles.left}`} onClick={onClick}>
      <i className="fa fa-chevron-left"></i>
    </button>
  );
}
