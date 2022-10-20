import { useGetProjectsQuery } from "../../features/portfolio/portfolioAPI";
import getPortfolioData from "../../utils/getPortfolioData";
import PortfolioBody from "./PortfolioBody";
import PortfolioHead from "./PortfolioHead";

export default function Section() {
  let content;
  const { data: projects, isLoading, hasError } = useGetProjectsQuery();
  if (isLoading) content = "All Projects Loading ...";
  if (!isLoading && hasError) content = "Error while Fetching All Projects";
  if (!isLoading && !hasError && projects?.data?.length === 0)
    content = "No Project Found";
  if (!isLoading && !hasError && projects?.data?.length > 0) {
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
