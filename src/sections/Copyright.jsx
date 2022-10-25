import React from "react";
import { useGetCopyrightInfoQuery } from "../features/copyright/copyrightAPI";

export default function Copyright() {
  const { data, isLoading, isError } = useGetCopyrightInfoQuery();
  let content;
  if (isLoading) content = "... ...";
  if (!isLoading && isError) content = "Error ..";
  if (!isLoading && !isError) {
    const { copyright_limit_year, copyright_owner } = data?.data?.attributes;
    content = copyright_limit_year + " " + copyright_owner;
  }
  let contentReserve = <span> All rights reserved.</span>;
  return (
    <footer className="p_20 color_primary bg_secondery text-center full_row">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="copyright">
              <p>
                <span>
                  Copyright &copy; {content}.{contentReserve}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
