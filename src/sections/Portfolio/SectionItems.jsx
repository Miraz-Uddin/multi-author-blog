import React, { useEffect, useState } from "react";
import IsoTopeGrid from "react-isotope";

export default function SectionItems({ filters, cardsLayout }) {
  // Trying to control noOfColums, but not working
  const [noOfColums, setNoOfColums] = useState(3);
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);
    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });
  useEffect(() => {
    if (deviceSize > 1191) {
      setNoOfColums(3);
    } else {
      setNoOfColums(1);
    }
  }, [deviceSize, noOfColums]);

  const content = (
    <>
      <IsoTopeGrid
        gridLayout={cardsLayout} // gridlayout of cards
        noOfCols={noOfColums} // number of columns show in one row
        filters={filters} // list of selected filters
        unitWidth={400} // card width of 1 unit
        unitHeight={260} // card height of 1 unit
      >
        {cardsLayout.map((card, index) => {
          const { id, fullImage, thumbnail, filter } = card || {};
          return (
            <div key={id} className={` mb_30`}>
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
    </>
  );

  return (
    <div className="filter-list">
      <div className="portfolio-items" style={{ minHeight: "512px" }}>
        <div className="row">{content}</div>
      </div>
    </div>
  );
}
