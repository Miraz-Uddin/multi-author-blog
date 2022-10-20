import React from "react";

export default function SectionFilter({ onFilter, filters }) {
  const isAllTrue = filters.every((element) => element.isChecked === true);
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="filters mb_30 w-100 text-center">
          <ul className="filter-tabs mx-auto d-inline-block">
            {filters.map((f) => {
              return (
                <li
                  key={`${f.label}_key`}
                  className={`${isAllTrue ? "" : f.isChecked ? "active" : ""} ${
                    isAllTrue && f.label === "all" ? "active" : ""
                  } filter`}
                  data-role="button"
                  data-filter="all"
                >
                  <input
                    id={f.label}
                    type="checkbox"
                    value={f.label}
                    onChange={onFilter}
                    checked={f.isChecked}
                    style={{ display: "none" }}
                  />
                  <label htmlFor={f.label}>{f.title}</label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
