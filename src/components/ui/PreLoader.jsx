import React from "react";

export default function PreLoader() {
  return (
    <div className="preloader">
      <div className="lds-css ng-scope">
        <div className="lds-spinner" style={{ width: "100%", height: "100%" }}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
