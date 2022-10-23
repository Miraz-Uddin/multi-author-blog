import { useSnackbar } from "notistack";
import React from "react";
import Typed from "react-typed";

export default function LoadingOrError({ message, isError }) {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar(message, { variant: isError ? "error" : "info" });
  return (
    <section
      id="main_banner"
      className=""
      style={{
        position: "relative",
        background: `url(${window.origin + "/images/slider/06.jpg"})`,
        backgroundSize: "cover",
        overflow: "hidden",
        backgroundPosition: "50% 50%",
        backgroundrepeat: "no-repeat",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-md-12 col-lg-12 home-content text-left">
            <div className="mainbanner_content">
              <span className="pb_5 banner_title color_white">I Am Nobody</span>
              <h1 className="cd-headline clip is-full-width text-uppercase">
                <span className="color_white" style={{ padding: "24px 0px" }}>
                  I am a{" "}
                </span>{" "}
                <span className="color_default">
                  <Typed
                    strings={["Freelancer", "Web Developer"]}
                    typeSpeed={60}
                    loop={true}
                    showCursor={false}
                  />
                </span>
              </h1>
              <p className="color_white mb_30">
                Libero habitasse sollicitudin aliquet venenatis iaculis placerat
                amet ligula, eleifend nonummy enim in volutpat diam.
              </p>
              <span
                className="btn btn-default"
                style={{ cursor: "pointer" }}
                disabled
              >
                Download CV
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
