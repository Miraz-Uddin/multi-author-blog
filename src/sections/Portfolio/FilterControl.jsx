const FilterControl = ({ filters, updateFilters }) => {
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

  const isAllTrue = filters.every(
    (element, index, array) => element.isChecked === true
  );

  return (
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
  );
};
export default FilterControl;
