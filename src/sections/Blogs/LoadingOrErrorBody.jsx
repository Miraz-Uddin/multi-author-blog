import { useSnackbar } from "notistack";
import React from "react";

export default function LoadingOrErrorBody({ message, isError }) {
  const { enqueueSnackbar } = useSnackbar();
  if (isError)
    enqueueSnackbar(message, { variant: isError ? "error" : "info" });
  return (
    <>
      <div className="col-md-12 col-lg-4">
        <div className="blog_item">
          <div className="comments">
            <i className="fa fa-comment" aria-hidden="true"></i>
            <span className="color_white">0</span>
          </div>
          <div className="blog_img overlay_one">
            <img
              src={window.origin + "/images/blog/03.jpg"}
              alt="blog1"
              style={{
                maxHeight: "250px",
                width: "auto",
                margin: "auto",
                display: "block",
              }}
            />
          </div>
          <div className="blog_content bg_white color_secondery">
            <div>
              <h5
                style={{
                  height: "38px",
                  lineHeight: "18px",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "2",
                  overflow: "hidden",
                  marginBottom: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Vulputate donec sem purus litora varius auctor augue suscipit
                hac.
              </h5>
            </div>
            <p
              className="mt_15 mb_30"
              style={{
                height: "110px",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "4",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              Dictumst integer sollicitudin venenatis ornare quam. Ligula
              integer luctus, blandit egestas molestie facilisi porttitor neque
              sodal luctus senectus lacinia euismod adipiscing element turpis
              dolor curae; posuere augue.
            </p>

            <div className="admin">
              <img
                src={window.origin + "/images/author/user.jpg"}
                alt="author"
              />
              <span className="color_white">By - John Doe</span>
            </div>
            <div className="date float-right color_primary">29 Feb 2020</div>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-4">
        <div className="blog_item">
          <div className="comments">
            <i className="fa fa-comment" aria-hidden="true"></i>
            <span className="color_white">0</span>
          </div>
          <div className="blog_img overlay_one">
            <img
              src={window.origin + "/images/blog/03.jpg"}
              alt="blog1"
              style={{
                maxHeight: "250px",
                width: "auto",
                margin: "auto",
                display: "block",
              }}
            />
          </div>
          <div className="blog_content bg_white color_secondery">
            <div>
              <h5
                style={{
                  height: "38px",
                  lineHeight: "18px",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "2",
                  overflow: "hidden",
                  marginBottom: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Vulputate donec sem purus litora varius auctor augue suscipit
                hac.
              </h5>
            </div>
            <p
              className="mt_15 mb_30"
              style={{
                height: "110px",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "4",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              Dictumst integer sollicitudin venenatis ornare quam. Ligula
              integer luctus, blandit egestas molestie facilisi porttitor neque
              sodal luctus senectus lacinia euismod adipiscing element turpis
              dolor curae; posuere augue.
            </p>
            <div className="admin">
              <img
                src={window.origin + "/images/author/user.jpg"}
                alt="author"
              />
              <span className="color_white">By - John Doe</span>
            </div>
            <div className="date float-right color_primary">29 Feb 2020</div>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-4">
        <div className="blog_item">
          <div className="comments">
            <i className="fa fa-comment" aria-hidden="true"></i>
            <span className="color_white">0</span>
          </div>
          <div className="blog_img overlay_one">
            <img
              src={window.origin + "/images/blog/03.jpg"}
              alt="blog1"
              style={{
                maxHeight: "250px",
                width: "auto",
                margin: "auto",
                display: "block",
              }}
            />
          </div>
          <div className="blog_content bg_white color_secondery">
            <div>
              <h5
                style={{
                  height: "38px",
                  lineHeight: "18px",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "2",
                  overflow: "hidden",
                  marginBottom: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Vulputate donec sem purus litora varius auctor augue suscipit
                hac.
              </h5>
            </div>
            <p
              className="mt_15 mb_30"
              style={{
                height: "110px",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "4",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              Dictumst integer sollicitudin venenatis ornare quam. Ligula
              integer luctus, blandit egestas molestie facilisi porttitor neque
              sodal luctus senectus lacinia euismod adipiscing element turpis
              dolor curae; posuere augue.
            </p>

            <div className="admin">
              <img
                src={window.origin + "/images/author/user.jpg"}
                alt="author"
              />
              <span className="color_white">By - John Doe</span>
            </div>
            <div className="date float-right color_primary">29 Feb 2020</div>
          </div>
        </div>
      </div>
    </>
  );
}
