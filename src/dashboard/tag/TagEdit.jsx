import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useUpdateTagMutation } from "../../features/tag/tagAPI";
import styles from "./tagCustom.module.css";

export default function TagEdit({ tag, tagEditable, setTagEditable }) {
  const { enqueueSnackbar } = useSnackbar();
  const [tagTitle, setTagTitle] = useState(tag ? tag.attributes.title : "");
  const [
    updateTag,
    { data: updatedTagData, isLoading: tagUpdating, isError: tagUpdateError },
  ] = useUpdateTagMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTag({
      id: tag?.id,
      data: {
        data: {
          title: tagTitle,
        },
      },
    });
  };

  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doEdit = (value) => {
    setTagTitle(value);
  };

  const handleTagEdit = debounceHandler(doEdit, 500);

  useEffect(() => {
    if (updatedTagData) {
      enqueueSnackbar("Tag Updated", { variant: "success" });
      setTagEditable(null);
    }
    if (tagUpdating) {
      enqueueSnackbar("Tag is Updating ...", { variant: "info" });
      setTagEditable(null);
    }
    if (tagUpdateError) {
      enqueueSnackbar("Tag can not be updated", { variant: "error" });
    }
  }, [
    updatedTagData,
    tagUpdating,
    tagUpdateError,
    enqueueSnackbar,
    setTagEditable,
  ]);

  return (
    <>
      {(tagEditable === null || tagEditable !== tag?.id) && (
        <span
          className={`${styles.tagTitle}`}
          style={{ textDecoration: "none", color: "#2c2c2c" }}
        >
          {tag?.attributes?.title}
        </span>
      )}
      {tagEditable !== null && tagEditable === tag?.id && (
        <>
          <form onSubmit={handleSubmit}>
            <input
              id="tagTitle"
              name="tagTitle"
              type="text"
              required
              placeholder="Enter a Tag ...."
              defaultValue={tagTitle}
              onChange={(e) => handleTagEdit(e.target.value)}
              className={`${styles.tagEditField}`}
            />
            <button className={`${styles.submitTagBtn}`} type="submit">
              <i className="fa fa-check"></i>
            </button>
          </form>
        </>
      )}
    </>
  );
}
