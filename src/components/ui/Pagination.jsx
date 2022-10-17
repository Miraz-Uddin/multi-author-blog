import React from "react";

export default function Pagination({
  totalItems,
  handlePageNumber,
  currentPage,
}) {
  const itemsPerPage = process.env.REACT_APP_VIEW_PER_PAGE;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <nav>
        <ul className="pagination full_row">
          {pageNumbers.map((number) => (
            <li
              key={number}
              onClick={() => handlePageNumber(number)}
              className={`page-item ${
                currentPage === number ? "active" : ""
              } cursor-pointer`}
            >
              <button type="button" className="page-link">
                {number}
              </button>
            </li>
          ))}
          {/* <li className="page-item">
          <a className="page-link" href="#">
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </a>
        </li> */}
        </ul>
      </nav>
    </>
  );
}
