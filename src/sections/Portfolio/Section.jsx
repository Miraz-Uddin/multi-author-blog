import { useGetProjectsQuery } from "../../features/portfolio/portfolioAPI";
import getPortfolioData from "../../utils/getPortfolioData";
import LoadingOrErrorBody from "./LoadingOrErrorBody";
import PortfolioBody from "./PortfolioBody";
import PortfolioHead from "./PortfolioHead";

export default function Section() {
  let content;
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  if (isLoading)
    content = <LoadingOrErrorBody message="Recent Projects Loading ..." />;
  if (!isLoading && isError)
    content = (
      <LoadingOrErrorBody
        isError={true}
        message="Network Error while Fetching Recent Projects"
      />
    );
  if (!isLoading && !isError && projects?.data?.length === 0)
    content = "No Recent Project Found";
  if (!isLoading && !isError && projects?.data?.length > 0) {
    const { filtersDefault, cardsLayout } = getPortfolioData(projects?.data);
    content = (
      <PortfolioBody
        filtersDefault={filtersDefault}
        cardsLayout={cardsLayout}
      />
    );
  }
  return (
    <section id="portfolio" className="py_80 bg_secondery full_row">
      <div className="container">
        <div className="row">
          <PortfolioHead />
          {content}
        </div>
      </div>
    </section>
  );
}
