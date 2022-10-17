import React from "react";
import notFoundImage from "../assets/media/img/not-found.png";
export default function NotFound() {
  return (
    <>
      <div id="authentication">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-md-6 m-auto">
              <div className="image">
                {/* <div className="logo">
                  <span>
                    <img src={logoImage} alt="E-Learning" />
                  </span>
                </div> */}
                <img src={notFoundImage} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
