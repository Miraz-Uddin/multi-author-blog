import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { useGetBlogQuery } from "../features/blog/blogAPI";
import RecentPost from "../sections/Blogs/RecentPost";
import SingleBlogDetails from "../sections/Blogs/SingleBlogDetails";
import Social from "../sections/Blogs/Social";
import CommentForm from "../sections/Comments/CommentForm";

export default function SingleBlog() {
  let { blogId } = useParams();
  const { data: blog } = useGetBlogQuery(blogId);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Breadcrumbs
        previousUrl="/blogs"
        previousPageName="Blog"
        currentPageName="Blog Details"
      />
      <section className="blog_area py_80 bg_secondery full_row">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-8">
              <div className="blog_details">
                <SingleBlogDetails blog={blog} />
                <CommentForm />
              </div>
            </div>
            <div className="col-md-4 col-lg-4">
              <div className="blog_sidebar">
                {blog && <Social blogAuthor={blog?.data?.attributes?.author} />}
                <RecentPost />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
