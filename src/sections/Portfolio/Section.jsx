import React, { useState } from "react";
import IsoTopeGrid from "react-isotope";
import cardsLayout from "./cardsLayout";
import FilterControl from "./FilterControl";
import filtersDefault from "./filtersDefault";

export default function Section() {
  const [filters, updateFilters] = useState(filtersDefault);
  return (
    <section id="portfolio" className="py_80 bg_secondery full_row">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
              <h2 className="title text-uppercase">
                <span className="line_double mx-auto color_default">
                  portfolio
                </span>
                Recent Projects
              </h2>
              <span className="sub_title">
                Interdum a etiam sagittis vehicula porta. Massa felis eros quam
                blandit nulla dolor habitant. Ullamcorper quis ornare et proin
                pellentesque.
              </span>
            </div>
          </div>
          <div className="col-md-12 col-lg-12">
            <div className="my_portfolio">
              <div className="row">
                <div className="col-md-12">
                  <div className="filters mb_30 w-100 text-center">
                    <FilterControl
                      filters={filters}
                      updateFilters={updateFilters}
                    />
                  </div>
                </div>
              </div>
              <div className="filter-list">
                <div className="portfolio-items" style={{ minHeight: "512px" }}>
                  <div className="row">
                    <IsoTopeGrid
                      gridLayout={cardsLayout} // gridlayout of cards
                      noOfCols={3} // number of columns show in one row
                      unitWidth={400} // card width of 1 unit
                      unitHeight={260} // card height of 1 unit
                      filters={filters} // list of selected filters
                    >
                      {cardsLayout.map((card, index) => {
                        return (
                          <div
                            key={card.id}
                            className={` mb_30 col-md-4 col-lg-4`}
                          >
                            <div className="default-portfolio-item">
                              <a
                                href={`${window.origin}/images/portfolio/0${
                                  index + 1
                                }.jpg`}
                                data-fancybox="gallery"
                              >
                                <img
                                  src={`${window.origin}/images/portfolio/0${
                                    index + 1
                                  }.jpg`}
                                  alt="port1"
                                />
                                <div className="overlay-box">
                                  <span>
                                    <i
                                      className="fa fa-eye"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <div className="tag">
                                    <ul>
                                      {card.filter.map((tag, i) => {
                                        return (
                                          <li key={i}>
                                            {tag.charAt(0).toUpperCase() +
                                              tag.slice(1)}
                                            {card.filter.length - 1 === i
                                              ? ""
                                              : ","}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </IsoTopeGrid>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
