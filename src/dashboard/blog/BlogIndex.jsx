import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetBLogsByAuthorQuery } from "../../features/blog/blogAPI";
import styles from "./blogCustom.module.css";

export default function BlogIndex() {
  const { user } = useSelector((state) => state.auth) || {};
  const {
    data: blogs,
    isLoading,
    isError,
  } = useGetBLogsByAuthorQuery(user?.id);
  let content;
  if (isLoading) content = "Blogs Loading ...";
  if (!isLoading && isError) content = "Error while Fetching Blogs";
  if (!isLoading && !isError && blogs?.data?.length === 0)
    content = "No Blog is Created By You Yet";
  if (!isLoading && !isError && blogs?.data?.length > 0) {
    const blogList = blogs?.data.map((blog, i) => {
      const { title, image } = blog?.attributes;
      const imageURL = image?.data?.attributes?.url;
      const blogImage =
        imageURL === undefined
          ? window.origin + "/images/blog/03.jpg"
          : imageURL.split("/")[0] === "uploads"
          ? process.env.REACT_APP_API_URL + imageURL
          : imageURL;
      return (
        <tr key={blog?.id}>
          <th scope="row">{i + 1}</th>
          <td>
            <span>
              <Link
                to={`/blogs/${blog?.id}`}
                className={`${styles.blogTitle}`}
                style={{ textDecoration: "none", color: "#2c2c2c" }}
              >
                {title}
              </Link>
            </span>
          </td>
          <td>
            <img className={`${styles.blogThumbnail}`} src={blogImage} alt="" />{" "}
          </td>
          <td>
            <div className="btn-group btn-group-sm" role="group">
              <Link
                to={`/dashboard/blogs/${blog?.id}/edit`}
                className="btn btn-info"
              >
                Edit
              </Link>
              <Link
                to={`/dashboard/blogs/${blog?.id}/delete`}
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
          <caption>Total Blog: {blogs?.data?.length}</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Thumbnail</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{blogList}</tbody>
        </table>
      </div>
    );
  }
  return <>{content}</>;
}
