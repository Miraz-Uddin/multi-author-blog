import { useSnackbar } from "notistack";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useDeleteCommentMutation,
  useGetCommentsByAuthorQuery,
} from "../../features/comment/commentAPI";
import Dashboard from "../../pages/Dashboard";
import styles from "./commentCustom.module.css";

export default function CommentIndex() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.auth) || {};
  const [deleteComment] = useDeleteCommentMutation();
  const handleDeleteComment = (id) => {
    enqueueSnackbar("Comment Deleted Successfully", {
      variant: "success",
    });
    deleteComment(id);
  };
  const {
    data: comments,
    isLoading,
    isError,
  } = useGetCommentsByAuthorQuery(user?.id);
  let content;
  if (isLoading) content = "Comments Loading ...";
  if (!isLoading && isError) content = "Error while Fetching Comments";
  if (!isLoading && !isError && comments?.data?.length === 0)
    content = "No Comment is Created By You Yet";
  if (!isLoading && !isError && comments?.data?.length > 0) {
    const commentList = comments?.data
      .slice()
      .sort((a, b) => {
        return (
          new Date(b.attributes.updatedAt) - new Date(a.attributes.updatedAt)
        );
      })
      .map((comment, i) => {
        const { message, blog } = comment?.attributes;
        return (
          <tr key={comment?.id}>
            <th scope="row">{i + 1}</th>
            <td>
              <span className={`${styles.commentTitle}`}>{message}</span>
            </td>
            <td>
              <span>
                <Link
                  to={`/blogs/${blog?.data?.id}`}
                  className={`${styles.blogTitle}`}
                  style={{ textDecoration: "none", color: "#2c2c2c" }}
                >
                  {blog?.data?.attributes?.title}
                </Link>
              </span>
            </td>
            <td>
              <div className="btn-group btn-group-sm" role="group">
                <Link
                  to={`/dashboard/comments/${comment?.id}/edit`}
                  className="btn btn-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteComment(comment?.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        );
      });
    content = (
      <div className="table-responsive">
        <table className={`table ${styles.dashTable}`}>
          <caption>Total Comment: {comments?.data?.length}</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Comment</th>
              <th scope="col">Blog</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{commentList}</tbody>
        </table>
      </div>
    );
  }
  return (
    <>
      <Dashboard
        content={content}
        activeBtn={"comments"}
        currentPageName={"Comments"}
      />
    </>
  );
}
