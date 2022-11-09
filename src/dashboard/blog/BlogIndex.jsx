import { useSnackbar } from "notistack";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useDeleteBlogMutation,
  useGetBLogsByAuthorQuery,
} from "../../features/blog/blogAPI";
import Dashboard from "../../pages/Dashboard";
import styles from "./blogCustom.module.css";

export default function BlogIndex() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.auth) || {};
  const {
    data: blogs,
    isLoading,
    isError,
  } = useGetBLogsByAuthorQuery(user?.id);
  const [deleteBlog] = useDeleteBlogMutation();
  const handleDeleteBlog = (id) => {
    enqueueSnackbar("Blog Deleted Successfully", {
      variant: "success",
    });
    deleteBlog(id);
  };
  let content;
  if (isLoading) content = "Blogs Loading ...";
  if (!isLoading && isError) content = "Error while Fetching Blogs";
  if (!isLoading && !isError && blogs?.data?.length === 0)
    content = "No Blog is Created By You Yet";
  if (!isLoading && !isError && blogs?.data?.length > 0) {
    const blogList = blogs?.data
      .slice()
      .sort((a, b) => {
        return (
          new Date(b.attributes.updatedAt) - new Date(a.attributes.updatedAt)
        );
      })
      .map((blog, i) => {
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
                >
                  {title}
                </Link>
              </span>
            </td>
            <td>
              <img
                className={`${styles.blogThumbnail}`}
                src={blogImage}
                alt=""
              />{" "}
            </td>
            <td>
              <div className="btn-group btn-group-sm" role="group">
                <Link
                  to={`/dashboard/blogs/${blog?.id}/edit`}
                  className="btn btn-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteBlog(blog?.id)}
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
  return (
    <>
      <Dashboard content={content} activeBtn={"blogs"} />
    </>
  );
}
