import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import PreLoader from "../../components/ui/PreLoader";
import { useGetCommentQuery } from "../../features/comment/commentAPI";
import CommentForm from "./CommentForm";

export default function CommentEdit() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.auth) || {};
  const { commentId } = useParams();
  let content;
  const { data: comment, isLoading, isError } = useGetCommentQuery(commentId);
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
    const { user: author } = comment?.data?.attributes;
    if (user?.id === author?.data?.id) {
      content = (
        <CommentForm
          commentId={comment?.data?.id}
          comment={comment?.data?.attributes}
          formType={"update"}
        />
      );
    } else {
      enqueueSnackbar("The Comment is Posted by Someone Else", {
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
        previousPageName="Comment"
        currentPageName="Comment Edit"
      />
      <section className="py_80 bg_secondery full_row">
        <div className="container">
          <div className="my_skill" id="authentication">
            <div className="row">
              <div className="col-12">
                <div className="replay mt_60 wow animated slideInUp">
                  <h4 className="text-uppercase text-center color_primary mb_30">
                    Edit Comment
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
