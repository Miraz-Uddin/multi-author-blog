import React from "react";

export default function CounterLoading({ message }) {
  return (
    <div className="col-12">
      <div className="counter count wow text-center" data-wow-duration="300ms">
        <h3 className="color_white my-5 text-center">{message}</h3>
      </div>
    </div>
  );
}
