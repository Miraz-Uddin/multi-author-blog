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

export default function BlogForm({ authId, blog, formType, blogId }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [longDescriptionEditorState, setLongDescriptionEditorState] = useState(
    EditorState.createEmpty()
  );
  const {
    title: blogTitle,
    short_description: blogShortDescription,
    long_description: blogLongDescription,
  } = blog || {};
  // console.log(blogLongDescription);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      title === "" ||
      shortDescription === "" ||
      (longDescription === "" && blogLongDescription === "")
    ) {
      enqueueSnackbar("Please fill all required forms", { variant: "error" });
    } else {
      if (formType === "store") {
        storeBlog({
          data: {
            title: title,
            short_description: shortDescription,
            long_description: longDescription,
            author: authId,
          },
        });
      }
      if (formType === "update") {
        updateBlog({
          id: blogId,
          data: {
            data: {
              title: title,
              short_description: shortDescription,
              long_description: longDescription
                ? longDescription
                : blogLongDescription,
            },
          },
        });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="blogTitle">
            Title <sup className="text-danger">*</sup>{" "}
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
        <div className="form-group">
          <label htmlFor="blogShortDescription">
            Short Description <sup className="text-danger">*</sup>{" "}
          </label>
          <textarea
            className="form-control"
            id="blogShortDescription"
            rows="3"
            type="text"
            name="blogShortDescription"
            value={blogShortDescription}
            placeholder="Enter Blog Short Description ..."
            onChange={(e) => setShortDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="blogLongDescription">
            Long Description <sup className="text-danger">*</sup>{" "}
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
        {/* <div className="form-group">
          <label
            className="btn btn-success btn-block mb-3"
            style={{ textTransform: "capitalize" }}
            htmlFor="avatar"
          >
            Click to Upload User's Avatar
          </label>
          <input
            type="file"
            style={{ display: "none" }}
            name="avatar"
            id="avatar"
          ></input>
        </div> */}
        {/* <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Example select</label>
          <select className="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect2">
            Example multiple select
          </label>
          <select
            multiple
            className="form-control"
            id="exampleFormControlSelect2"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div> */}
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
