import React from "react";
import ContactForm from "./ContactForm";

export default function FooterLoading() {
  return (
    <>
      <div className="col-md-4 col-lg-4">
        <div className="blog_item">
          <div
            className="blog_content bg_white color_secondery"
            style={{ width: "100%" }}
          >
            <p className="mt_15 mb_30 placeholder-glow">
              <span className="placeholder col-11"></span>
              <span className="placeholder col-10"></span>
              <span className="placeholder col-11"></span>
              <span className="placeholder col-10"></span>
              <span className="placeholder col-11"></span>
              <span className="placeholder col-10"></span>
              <span className="placeholder col-11"></span>
              <span className="placeholder col-10"></span>
              <span className="placeholder col-12"></span>
            </p>
          </div>
        </div>
      </div>
      <ContactForm />
    </>
  );
}
