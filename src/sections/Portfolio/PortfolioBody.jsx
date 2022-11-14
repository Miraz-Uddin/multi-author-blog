import React, { useState } from "react";
import SectionFilter from "./SectionFilter";
import SectionItems from "./SectionItems";

export default function PortfolioBody({ filtersDefault, cardsLayout }) {
  const [filters, updateFilters] = useState(filtersDefault);
  const onFilter = (event) => {
    const {
      target: { value },
    } = event;
    updateFilters(
      filters.map((f) => {
        return {
          ...f,
          isChecked: value === "all" ? true : f.label === value,
        };
      })
    );
  };
  return (
    <div className="col-md-6 col-lg-12">
      <div className="my_portfolio">
        <SectionFilter onFilter={onFilter} filters={filters} />
        <SectionItems filters={filters} cardsLayout={cardsLayout} />
      </div>
    </div>
  );
}
