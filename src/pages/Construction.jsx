import React from "react";
import comingSoonImage from "../assets/media/img/coming-soon.png";

export default function Construction() {
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
                <img src={comingSoonImage} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
