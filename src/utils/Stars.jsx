import React from "react";

export default function Stars({ rating }) {
  const full = rating === Math.floor(rating) ? rating : Math.floor(rating);
  const half = rating < Math.round(rating) ? 1 : 0;
  const blank = half === 0 ? 5 - full : 4 - full;
  return (
    <>
      {[...Array(full)].map((elementInArray, index) => {
        return (
          <li key={index}>
            <i className="fa fa-star" aria-hidden="true"></i>
          </li>
        );
      })}
      {[...Array(half)].map((elementInArray, index) => {
        return (
          <li key={index}>
            <i className="fa fa-star-half-o" aria-hidden="true"></i>
          </li>
        );
      })}
      {[...Array(blank)].map((elementInArray, index) => {
        return (
          <li key={index}>
            <i className="fa fa-star-o" aria-hidden="true"></i>
          </li>
        );
      })}
    </>
  );
}
