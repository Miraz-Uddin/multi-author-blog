import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({
  previousUrl,
  previousPageName,
  currentPageName,
}) {
  return (
    <section className="banner background9 overlay_three full_row">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="banner_text text-center">
              <h1 className="page_banner_title color_white text-uppercase">
                {currentPageName}
              </h1>
              <div className="breadcrumbs m-auto d-inline-block">
                <ul>
                  <li className="hover_gray">
                    <Link to={previousUrl}>{previousPageName}</Link>
                  </li>
                  <li>
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </li>
                  <li className="color-default">{currentPageName}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
