import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import PreLoader from "../../components/ui/PreLoader";
import { useGetBlogQuery } from "../../features/blog/blogAPI";
import BlogForm from "./BlogForm";

export default function BlogEdit() {
  const { enqueueSnackbar } = useSnackbar();
  const { user: auth } = useSelector((state) => state.auth) || {};
  const { blogId } = useParams();
  let content;
  const { data: blog, isLoading, isError } = useGetBlogQuery(blogId);
  if (isLoading) content = <PreLoader />;
  if (!isLoading && isError) {
    enqueueSnackbar("Error while Fetching Blog's Data", { variant: "error" });
    content = (
      <>
        <Navigate to="/dashboard" />
      </>
    );
  }
  if (!isLoading && !isError) {
    const { author } = blog?.data?.attributes;
    if (auth?.id === author?.data?.id) {
      content = (
        <BlogForm
          blogId={blog?.data?.id}
          blog={blog?.data?.attributes}
          formType={"update"}
          authId={auth?.id}
        />
      );
    } else {
      enqueueSnackbar("The Blog is Authored by Someone Else", {
        variant: "error",
      });
      content = (
        <>
          <Navigate to="/dashboard" />
        </>
      );
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Breadcrumbs
        previousUrl="/dashboard"
        previousPageName="Dashboard"
        currentPageName="Blog Edit"
      />
      <section className="py_80 bg_secondery full_row">
        <div className="container">
          <div className="my_skill" id="authentication">
            <div className="row">
              <div className="col-12">
                <div className="replay mt_60 wow animated slideInUp">
                  <h4 className="text-uppercase text-center color_primary mb_30">
                    Edit Blog
                  </h4>
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
