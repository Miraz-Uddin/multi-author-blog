import React from "react";
import { useGetServiceQuery } from "../../features/service/serviceAPI";
import LoadingOrError from "./LoadingOrError";
import ServiceItem from "./ServiceItem";

export default function ServiceList() {
  let content;
  const { data: service, isLoading, isError } = useGetServiceQuery();
  if (isLoading)
    content = <LoadingOrError message="Service Information Loading ..." />;
  if (!isLoading && isError)
    content = (
      <LoadingOrError isError={true} message="Error while fetching Services" />
    );
  if (!isLoading && !isError) {
    const { section, title, subtitle, p_services } = service?.data?.attributes;
    content = (
      <>
        <div className="col-md-12 col-lg-12">
          <div className="section_title_1 text-center mx-auto pb_60 wow animated slideInUp">
            <h2 className="title text-uppercase">
              <span className="line_double mx-auto color_default">
                {section}
              </span>
              {title}
            </h2>
            <span className="sub_title">{subtitle}</span>
          </div>
        </div>
        <div className="services_item1">
          <div className="col-md-12 col-lg-12">
            <div className="row">
              {p_services &&
                p_services?.data?.length > 0 &&
                p_services.data
                  .slice()
                  .sort((a, b) => {
                    return a.attributes.serial - b.attributes.serial;
                  })
                  .map((serviceItem) => (
                    <ServiceItem
                      key={serviceItem?.id}
                      item={serviceItem?.attributes}
                    />
                  ))}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <section id="services" className="py_80 full_row bg_white" name="services">
      <div className="container">
        <div className="row">{content}</div>
      </div>
    </section>
  );
}
