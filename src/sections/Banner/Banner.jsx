import React from "react";
import Typed from "react-typed";
import { useGetBannerInfoQuery } from "../../features/banner/bannerAPI";
import BannerLoader from "./BannerLoader";

export default function Banner() {
  const onButtonClick = (url, fileName) => {
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = fileName;
        alink.click();
      });
    });
  };
  let content;
  const { data, isLoading, isError } = useGetBannerInfoQuery();
  if (isLoading) {
    // content = "Banner Information Loading ...";
    content = <BannerLoader message="Banner Information Loading ..." />;
  }
  if (!isLoading && isError)
    content = "Error while fetching Banner Information";
  if (!isLoading && !isError) {
    const {
      title,
      short_description,
      background,
      cv,
      primary_profession,
      secondary_profession,
      optional_profession,
    } = data?.data?.attributes;
    const imageURL = background?.data?.attributes?.url;
    const bannerImage =
      imageURL === undefined
        ? window.origin + "/images/slider/06.jpg"
        : imageURL.split("/")[0] === "uploads"
        ? process.env.REACT_APP_API_URL + imageURL
        : imageURL;
    const cvURL = cv?.data?.attributes?.url;
    const cvFileName = cv?.data?.attributes?.caption;
    const cvLink =
      cvURL === undefined
        ? "https://res.cloudinary.com/demo/image/upload/example_pdf.pdf"
        : cvURL;
    const cvName = cvFileName === undefined ? "example.pdf" : cvFileName;
    content = (
      <section
        id="main_banner"
        className=""
        style={{
          position: "relative",
          background: `url(${bannerImage})`,
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
                <span className="pb_5 banner_title color_white">
                  I Am {title}
                </span>
                <h1 className="cd-headline clip is-full-width text-uppercase">
                  <span className="color_white" style={{ padding: "24px 0px" }}>
                    I am a{" "}
                  </span>{" "}
                  <span className="color_default">
                    <Typed
                      strings={[
                        primary_profession,
                        secondary_profession,
                        optional_profession,
                      ]}
                      typeSpeed={60}
                      loop={true}
                      showCursor={false}
                    />
                  </span>
                </h1>
                <p className="color_white mb_30">{short_description}</p>
                <span
                  className="btn btn-default"
                  style={{ cursor: "pointer" }}
                  onClick={() => onButtonClick(cvLink, cvName)}
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
  return <>{content}</>;
}
