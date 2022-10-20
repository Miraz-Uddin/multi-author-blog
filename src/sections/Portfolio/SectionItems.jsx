import React from "react";
import IsoTopeGrid from "react-isotope";

export default function SectionItems({ filters, cardsLayout }) {
  return (
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
              const { id, fullImage, thumbnail, filter } = card || {};
              return (
                <div key={id} className={` mb_30 col-md-4 col-lg-4`}>
                  <div className="default-portfolio-item">
                    <a href={fullImage} data-fancybox="gallery">
                      <img src={thumbnail} alt="port1" />
                      <div className="overlay-box">
                        <span>
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </span>
                        <div className="tag">
                          <ul>
                            {filter.map((tag, i) => {
                              return (
                                <li key={i}>
                                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                  {filter.length - 1 === i ? "" : ","}
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
  );
}
