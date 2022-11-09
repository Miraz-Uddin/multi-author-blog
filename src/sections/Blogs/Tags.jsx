import React from "react";
import { useGetTagsQuery } from "../../features/tag/tagAPI";
import styles from "./blogCustom.module.css";

export default function Tags({ tagsClicked, selectedTag }) {
  const { data: tags, isLoading, isError } = useGetTagsQuery();
  // decide what to render
  let content;
  if (isLoading) content = <li>Tags Loading ...</li>;
  if (!isLoading && isError) content = <li>Error while fetching Tags</li>;
  if (!isLoading && !isError && tags?.data?.length === 0)
    content = <li>No Tags Found</li>;
  if (!isLoading && !isError && tags?.data?.length > 0)
    content = tags?.data.map((tag) => (
      <li key={tag.id}>
        <span
          className={`${styles.tags} ${
            selectedTag === tag?.attributes?.title ? styles.tagsSelected : ""
          }`}
          onClick={() => tagsClicked(tag?.attributes?.title)}
        >
          {tag?.attributes?.title}
        </span>
      </li>
    ));
  return (
    <div className="widget mb_60 d-inline-block p_30 bg_white full_row wow animated slideInUp">
      <h3 className="widget_title mb_30 text-capitalize d-flex justify-content-between">
        <span>Tags</span>
        <button
          className={`badge font-regular ${selectedTag ? "" : "d-none"}`}
          style={{ color: "#ffb32f", background: "none", border: "none" }}
          type="button"
          onClick={() => tagsClicked(null)}
        >
          Clear
        </button>
      </h3>
      <div className="tags">
        <ul>{content}</ul>
      </div>
    </div>
  );
}
