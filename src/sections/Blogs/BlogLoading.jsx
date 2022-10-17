import React from "react";
import blogSampleImage from "../../assets/images/blog/01.jpg";

export default function BlogLoading() {
  return (
    <>
      <div className="col-md-12 col-lg-4">
        <div className="blog_item">
          <div className="blog_img overlay_one">
            <img src={blogSampleImage} alt="blog1" />
          </div>
          <div
            className="blog_content bg_white color_secondery"
            style={{ width: "100%" }}
          >
            <div className="blog_title">
              <h5 className="placeholder-wave row">
                <span className="placeholder col-11 placeholder-lg m-auto"></span>
              </h5>
            </div>
            <p className="mt_15 mb_30 placeholder-glow">
              <span className="placeholder col-11"></span>
              <span className="placeholder col-10"></span>
              <span className="placeholder col-11"></span>
              <span className="placeholder col-8"></span>
              <span className="placeholder col-2"></span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
