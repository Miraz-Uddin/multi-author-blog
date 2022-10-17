import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useStoreCommentMutation } from "../../features/comment/commentAPI";
export default function ReplyForm({ parentId, setSelectedLi }) {
  const { user } = useSelector((state) => state.auth) || {};
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(" ");
  let { blogId } = useParams();

  const [storeComment, { isLoading }] = useStoreCommentMutation();

  useEffect(() => {
    if (!user) {
      setMessage("");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      const reply = message.trim();
      if (reply === "" || reply === null || reply === undefined) {
        enqueueSnackbar("Please Write something to Reply", {
          variant: "warning",
        });
      } else {
        storeComment({
          data: {
            message: reply,
            user: user.id,
            blog: blogId,
            parentId: parentId.toString(),
          },
        });
        enqueueSnackbar("Reply Sent Successfully", { variant: "success" });
        setMessage(" ");
        setSelectedLi(null);
      }
    } else {
      enqueueSnackbar("You must Log in to Reply", { variant: "warning" });
      navigate("/login", { state: { from: location.pathname } });
    }
  };
  return (
    <div>
      <form className="reply_form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <textarea
              className="form-control"
              rows="7"
              placeholder="Write a Reply ..."
              style={{ background: "aliceblue", marginTop: "20px" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="col-md-12">
            <button
              type="submit"
              className="btn btn-default"
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
