import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useStoreCommentMutation } from "../../features/comment/commentAPI";
export default function CommentForm() {
  const { user } = useSelector((state) => state.auth) || {};
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(user ? user.email : "example@example.com");
  const [message, setMessage] = useState(" ");
  let { blogId } = useParams();

  const [storeComment, { isLoading }] = useStoreCommentMutation();

  useEffect(() => {
    if (!user) {
      setEmail("");
      setMessage("");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      if (email === user.email) {
        const reply = message.trim();
        if (reply === "" || reply === null || reply === undefined) {
          enqueueSnackbar("Comment Can not be blank", { variant: "warning" });
        } else {
          storeComment({
            data: {
              message: reply,
              user: user.id,
              blog: blogId,
            },
          });
          enqueueSnackbar("Comment Posted Successfully", {
            variant: "success",
          });
          setMessage(" ");
        }
      } else {
        enqueueSnackbar("You must Give Your Own Email", { variant: "error" });
      }
    } else {
      enqueueSnackbar("You must Log in to Comment", { variant: "warning" });
      navigate("/login", { state: { from: location.pathname } });
    }
  };
  return (
    <>
      <div className="replay mt_60 wow animated slideInUp">
        <h4 className="text-uppercase color_primary mb_30">Leave A Comment</h4>
        <form className="reply_form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <input
                className="form-control"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <textarea
                className="form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="7"
                placeholder="Type Comments..."
              ></textarea>
            </div>
            <div className="col-md-12">
              <button
                type="submit"
                className="btn btn-default"
                disabled={isLoading}
              >
                Post Comment
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
