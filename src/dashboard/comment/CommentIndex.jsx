import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetCommentsByAuthorQuery } from "../../features/comment/commentAPI";
import styles from "./commentCustom.module.css";

export default function CommentIndex() {
  const { user } = useSelector((state) => state.auth) || {};
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
                <Link
                  to={`/dashboard/comments/${comment?.id}/delete`}
                  className="btn btn-danger"
                >
                  Delete
                </Link>
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
  return <>{content}</>;
}
