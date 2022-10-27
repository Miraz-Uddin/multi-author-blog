import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import {
  useStoreBlogMutation,
  useUpdateBlogMutation,
} from "../../features/blog/blogAPI";
import checkImageFileType from "../../utils/checkImageFileType";
import getSerializeData from "../../utils/getSerializeData";

export default function BlogForm({ author, blog, formType, blogId }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [longDescriptionEditorState, setLongDescriptionEditorState] = useState(
    EditorState.createEmpty()
  );
  const [image, setImage] = useState(null);
  const {
    title: blogTitle,
    short_description: blogShortDescription,
    long_description: blogLongDescription,
    image: blogImage,
  } = blog || {};
  const longDescriptionBlock = htmlToDraft(blogLongDescription ?? "");
  const longDescriptionState = ContentState.createFromBlockArray(
    longDescriptionBlock.contentBlocks
  );
  const _longDescriptionEditorState =
    EditorState.createWithContent(longDescriptionState);

  const [
    storeBlog,
    { data: blogStoredData, isLoading: blogStoring, isError: blogStoreError },
  ] = useStoreBlogMutation();
  const [
    updateBlog,
    {
      data: blogUpdatedData,
      isLoading: blogUpdating,
      isError: blogUpdateError,
    },
  ] = useUpdateBlogMutation();

  const imageUpload = (e) => {
    const isMimeTypeOk = checkImageFileType(e.target, "imagePreview");
    if (isMimeTypeOk) {
      setImage(e.target.files[0]);
    } else {
      enqueueSnackbar("Invalid file type", {
        variant: "error",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      title === "" ||
      shortDescription === "" ||
      (longDescription === "" && blogLongDescription === "")
    ) {
      enqueueSnackbar("Please fill all required forms", { variant: "error" });
    } else {
      const othersInfo = {
        title,
        short_description: shortDescription,
        long_description: longDescription
          ? longDescription
          : blogLongDescription,
      };
      if (formType === "update") {
        if (image?.data === null) {
          // Image doesnot exist at all and not updated too
          updateBlog({
            id: blogId,
            data: {
              data: {
                ...othersInfo,
              },
            },
          });
        } else if (image?.data?.id) {
          // if not updated image, but image existed before
          updateBlog({
            id: blogId,
            data: {
              data: {
                ...othersInfo,
                image,
              },
            },
          });
        } else {
          // if updated image, and (image existed before or doesnot exist at all)
          updateBlog({
            id: blogId,
            data: getSerializeData(
              {
                ...othersInfo,
              },
              "image",
              image
            ),
          });
        }
      }
      if (formType === "store") {
        if (image?.data === null) {
          // Image doesnot exist at all and not updated too
          storeBlog({
            data: {
              ...othersInfo,
              author,
            },
          });
        } else if (image?.data?.id) {
          // if not updated image, but image existed before
          storeBlog({
            data: {
              ...othersInfo,
              author,
              image,
            },
          });
        } else {
          // if updated image, and (image existed before or doesnot exist at all)
          storeBlog(
            getSerializeData(
              {
                ...othersInfo,
                author,
              },
              "image",
              image
            )
          );
        }
      }
    }
  };

  useEffect(() => {
    if (blogStoreError?.data) {
      const errorMessage = blogStoreError?.data?.error?.message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
    if (blogUpdateError?.data) {
      const errorMessage = blogUpdateError?.data?.error?.message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
    if (blogStoredData) {
      enqueueSnackbar("Blog Created Successfully", { variant: "success" });
      navigate("/dashboard");
    }
    if (blogUpdatedData) {
      enqueueSnackbar("Blog Updated Successfully", { variant: "success" });
      navigate("/dashboard");
    }
  }, [
    blogStoredData,
    blogUpdatedData,
    blogStoreError,
    blogUpdateError,
    navigate,
    enqueueSnackbar,
  ]);

  useEffect(() => {
    setTitle(blogTitle ?? "");
    setShortDescription(blogShortDescription ?? "");
    setLongDescription(longDescription ?? "");
    setLongDescriptionEditorState(_longDescriptionEditorState);
    setImage(blogImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let blogPreviewImage = window.origin + "/images/blog/03.jpg";
  const imageURL = image?.data?.attributes?.url;
  blogPreviewImage =
    imageURL === undefined
      ? window.origin + "/images/blog/03.jpg"
      : imageURL.split("/")[0] === "uploads"
      ? process.env.REACT_APP_API_URL + imageURL
      : imageURL;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="blogTitle">
                <strong>Title</strong> <sup className="text-danger">*</sup>{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="blogTitle"
                name="title"
                value={title}
                placeholder="Enter a Title ..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <div className="bg-white">
                <div
                  id="imagePreview"
                  style={{
                    margin: "auto",
                    width: "12.8rem",
                    height: "14.3rem",
                  }}
                >
                  <figure className="figure">
                    <img
                      src={blogPreviewImage}
                      className="figure-img img-fluid rounded"
                      alt="preview author"
                    />
                  </figure>
                </div>
                <div>
                  <label
                    className="btn btn-success btn-block mb-0"
                    style={{ textTransform: "capitalize" }}
                    htmlFor="avatar"
                  >
                    Click to Upload Blog Thumbnail
                  </label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    name="avatar"
                    id="avatar"
                    onChange={imageUpload}
                    disabled={blogUpdating}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <label htmlFor="blogShortDescription">
                <strong>Short Description</strong>{" "}
                <sup className="text-danger">*</sup>{" "}
              </label>
              <textarea
                className="form-control"
                id="blogShortDescription"
                rows="10"
                type="text"
                name="blogShortDescription"
                value={blogShortDescription}
                placeholder="Enter Blog Short Description ..."
                onChange={(e) => setShortDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="blogLongDescription">
                <strong>Long Description</strong>{" "}
                <sup className="text-danger">*</sup>{" "}
              </label>
              <Editor
                id="blogLongDescription"
                editorState={longDescriptionEditorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="form-control"
                onEditorStateChange={(newState) => {
                  setLongDescriptionEditorState(newState);
                  setLongDescription(
                    draftToHtml(convertToRaw(newState.getCurrentContent()))
                  );
                }}
              ></Editor>
            </div>
          </div>
        </div>
        {formType === "update" && (
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-success"
              disabled={blogUpdating}
            >
              Update Blog
            </button>
          </div>
        )}
        {formType === "store" && (
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-success"
              disabled={blogStoring}
            >
              Create New Blog
            </button>
          </div>
        )}
      </form>
    </>
  );
}
