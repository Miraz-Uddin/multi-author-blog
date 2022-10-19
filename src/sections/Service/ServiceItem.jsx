import React from "react";
import * as FontAwesomeIcon from "react-icons/fa";

import styles from "./serviceCustom.module.css";

export default function ServiceItem({ item }) {
  const { serial, title, short_description, icon_class } = item || {};
  const FontIcon = FontAwesomeIcon[icon_class];
  return (
    <div className="col-md-6 col-lg-4">
      <div className="service_two text-center pt_15 mb_30 wow animated slideInUp">
        <div className="srv_item_number color_lightgray">
          <strong>0{serial}.</strong>
        </div>
        <h3 className="p_20 text-uppercase color_primary">{title}</h3>
        <div className="srv_icon color_white d-flex flex-column justify-content-center">
          {/* <span className="flaticon-shopping-cart"></span> */}
          <span>
            <FontIcon className={styles.icon} />
          </span>
        </div>
        <p>{short_description}</p>
      </div>
    </div>
  );
}
