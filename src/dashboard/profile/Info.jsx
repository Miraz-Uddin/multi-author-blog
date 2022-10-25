import React from "react";
import styles from "./profileCustom.module.css";

export default function Info({ label, value }) {
  return (
    <div className="mb-2">
      <label className={`${styles.label}`}>{label}:</label>
      <input className={`${styles.input}`} disabled defaultValue={value} />
    </div>
  );
}
