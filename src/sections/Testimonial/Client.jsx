import React from "react";
import Stars from "../../utils/Stars";

export default function Client({ client }) {
  const { client_rating, client_name, client_review, client_image } =
    client || {};
  const imageURL = client_image?.data?.attributes?.url;
  const clientImage =
    imageURL === undefined
      ? window.origin + "/images/testimonial/01.jpg"
      : imageURL.split("/")[0] === "uploads"
      ? process.env.REACT_APP_API_URL + imageURL
      : imageURL;
  return (
    <div className="member_feedback p_30 color_secondery">
      <div className="client_img">
        <img src={clientImage} alt="client" />
      </div>
      <div className="star d-inline-block mt_30 color_default">
        <ul>
          <Stars rating={client_rating} />
        </ul>
      </div>
      <h5 className="color_primary mb_15">{client_name}</h5>
      <p>{client_review}</p>
    </div>
  );
}
