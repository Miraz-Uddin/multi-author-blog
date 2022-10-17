import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCommentsQuery } from "../../features/comment/commentAPI";
import getSeparations from "../../utils/getSeparations";
import SingleComment from "./SingleComment";

export default function Comments({ blog }) {
  const [selectedLi, setSelectedLi] = useState(null);
  let { blogId } = useParams();
  const { data: comments, isLoading, hasError } = useGetCommentsQuery(blogId);
  const replyBtnClicked = (id) => {
    setSelectedLi(id);
  };
  useEffect(() => {}, [comments]);
  // decide what to render
  let content;
  if (isLoading)
    content = (
      <h4 className="text-uppercase color_primary mb_30">
        Comments Loading ...
      </h4>
    );
  if (!isLoading && hasError)
    content = (
      <h4 className="text-uppercase color_primary mb_30">
        Error while fetching Comments
      </h4>
    );
  if (!isLoading && !hasError && comments.data?.length === 0)
    content = (
      <h4 className="text-uppercase color_primary mb_30">Comments (0)</h4>
    );
  if (!isLoading && !hasError && comments.data?.length > 0) {
    const allComments = getSeparations(comments.data);
    const commentsList = allComments
      .sort((a, b) => {
        return (
          new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
        );
      })
      .map((comment) => {
        return (
          <SingleComment
            key={comment.id}
            comment={comment}
            commentId={comment.id}
            replyBtnClicked={replyBtnClicked}
            formShow={selectedLi === comment.id ? true : false}
            selectedLi={selectedLi}
            setSelectedLi={setSelectedLi}
          />
        );
      });
    content = (
      <>
        <h4 className="text-uppercase color_primary mb_30">
          Comments ({comments.data?.length})
        </h4>
        <ul className="user_comments">{commentsList}</ul>
      </>
    );
  }
  useEffect(() => {}, [comments]);

  return <div className="comment_area mt_60">{content}</div>;
}
