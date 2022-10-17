import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Pagination from "../components/ui/Pagination";
import { useGetBlogsQuery } from "../features/blog/blogAPI";
import Archives from "../sections/Blogs/Archives";
import BlogItem from "../sections/Blogs/BlogItem";
import Loading from "../sections/Blogs/Loading";
import RecentPost from "../sections/Blogs/RecentPost";
import Tags from "../sections/Blogs/Tags";

const Blogs = () => {
  const [tags, setTags] = useState(null);
  const [monthYear, setMonthYear] = useState(null);
  const [monthYearLi, setMonthYearLi] = useState(null);
  const {
    data: blogs,
    isLoading,
    hasError,
  } = useGetBlogsQuery({ tags, monthYear });

  const tagsClicked = (tagName) => {
    setTags(tagName);
  };

  const monthYearClicked = (monthYear, monthYearLi) => {
    setMonthYear(monthYear);
    setMonthYearLi(monthYearLi);
  };

  // pagination Functionality
  const itemsPerPage = process.env.REACT_APP_VIEW_PER_PAGE;
  const [currentPage, setCurrentPage] = useState(1);
  // get current Items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs?.data.slice(indexOfFirstItem, indexOfLastItem);
  // Change Page
  const handlePageNumber = (currentPageNumber) =>
    setCurrentPage(currentPageNumber);

  // decide what to render
  let content;
  if (isLoading) content = <Loading />;
  if (!isLoading && hasError) content = <span>No Blogs Found</span>;
  if (!isLoading && !hasError && blogs?.data?.length === 0)
    content = <span>No Blogs Found</span>;
  if (!isLoading && !hasError && blogs?.data?.length > 0)
    content = currentItems.map((blog) => {
      return (
        <Link
          to={`/blogs/${blog.id}`}
          key={blog.id}
          className="blog_item mb_30"
          style={{ textDecoration: "none", color: "#2c2c2c" }}
        >
          <BlogItem info={blog.attributes} />
        </Link>
      );
    });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Breadcrumbs
        previousUrl="/"
        previousPageName="Home"
        currentPageName="Blogs"
      />
      <section className="blog_area py_80 bg_secondery full_row">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-lg-8">
              <div className="blog_list mb_60">{content}</div>
              {!isLoading &&
                !hasError &&
                blogs?.data.length > 0 &&
                blogs?.data.length > itemsPerPage && (
                  <Pagination
                    totalItems={blogs?.data.length}
                    handlePageNumber={handlePageNumber}
                    currentPage={currentPage}
                  />
                )}
            </div>
            <div className="col-md-5 col-lg-4">
              <div className="blog_sidebar">
                <Tags tagsClicked={tagsClicked} selectedTag={tags} />
                <Archives
                  monthYearClicked={monthYearClicked}
                  selectedMonthYear={monthYearLi}
                />
                <RecentPost />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
