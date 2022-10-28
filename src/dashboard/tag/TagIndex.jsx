import { useSnackbar } from "notistack";
import React, { useRef, useState } from "react";
import {
  useDeleteTagMutation,
  useGetTagsQuery,
} from "../../features/tag/tagAPI";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import styles from "./tagCustom.module.css";
import TagEdit from "./TagEdit";

export default function TagIndex() {
  const [tagEditable, setTagEditable] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, isError } = useGetTagsQuery();
  const [deleteTag] = useDeleteTagMutation();

  const componentRef = useRef(null);
  useOutsideAlerter(componentRef, setTagEditable);
  const handleDeleteTag = (id) => {
    enqueueSnackbar("Tag Deleted Successfully", {
      variant: "success",
    });
    deleteTag(id);
  };
  const handleEditTag = (id) => {
    setTagEditable(id);
  };
  let content;
  if (isLoading) content = "Tags Loading ...";
  if (!isLoading && isError) content = "Error while Fetching Tags";
  if (!isLoading && !isError && data?.data?.length === 0)
    content = "No Tag is Created Yet";
  if (!isLoading && !isError && data?.data?.length > 0) {
    const tagList = data?.data
      .slice()
      .sort((a, b) => {
        return (
          new Date(b.attributes.publishedAt) -
          new Date(a.attributes.publishedAt)
        );
      })
      .map((tag, i) => {
        return (
          <tr key={tag?.id}>
            <th scope="row">{i + 1}</th>
            <td>
              <TagEdit
                tag={tag}
                tagEditable={tagEditable}
                setTagEditable={setTagEditable}
              />
            </td>
            <td>
              <div className="btn-group btn-group-sm" role="group">
                <button
                  onClick={() => handleEditTag(tag?.id)}
                  className="btn btn-info"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTag(tag?.id)}
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
          <caption>Total Tag: {data?.data?.length}</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody ref={componentRef}>{tagList}</tbody>
        </table>
      </div>
    );
  }
  return <>{content}</>;
}
