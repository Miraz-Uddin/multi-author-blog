import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateCommentMutation } from "../../features/comment/commentAPI";

export default function CommentForm({ commentId, comment, formType }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    message: commentMessage,
    parentId: commentParentId,
    user,
    blog,
  } = comment || {};
  const [
    updateComment,
    {
      data: updatedCommentData,
      isLoading: commentUpdating,
      isError: commentUpdateError,
    },
  ] = useUpdateCommentMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message === "") {
      enqueueSnackbar("Please fill all required forms", { variant: "warning" });
    } else {
      if (formType === "store") {
        // do nothing
      }
      if (formType === "update") {
        updateComment({
          id: commentId,
          data: {
            data: {
              message: message,
              user: user?.data?.id,
              blog: blog?.data?.id,
              parentId: commentParentId,
            },
          },
        });
      }
    }
  };

  useEffect(() => {
    if (commentUpdateError?.data) {
      const errorMessage = commentUpdateError?.data?.error?.message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
    if (updatedCommentData) {
      enqueueSnackbar("Comment Updated", { variant: "success" });
      navigate("/dashboard");
    }
  }, [updatedCommentData, commentUpdateError, navigate, enqueueSnackbar]);

  useEffect(() => {
    setMessage(commentMessage ?? "");
  }, [commentMessage]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="commentMessage">Comment Message</label>
          <input
            type="text"
            className="form-control"
            id="commentMessage"
            name="message"
            value={message}
            placeholder="Edit Your Comment"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {formType === "update" && (
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-success"
              disabled={commentUpdating}
            >
              Update Comment
            </button>
          </div>
        )}
      </form>
    </>
  );
}
