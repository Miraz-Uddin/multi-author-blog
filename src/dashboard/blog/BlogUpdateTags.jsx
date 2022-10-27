import React from "react";
import { useGetTagsQuery } from "../../features/tag/tagAPI";

// import styles from "./blogCustom.module.css";
import BlogUpdateTag from "./BlogUpdateTag";

export default function BlogUpdateTags({ tags, setTagsResponse }) {
  const { data: tagList, isLoading, isError } = useGetTagsQuery();
  let content;
  if (isLoading) content = <li>Tags Loading ...</li>;
  if (!isLoading && isError) content = <li>Error while fetching Tags</li>;
  if (!isLoading && !isError) {
    content = (
      <BlogUpdateTag
        setTagsResponse={setTagsResponse}
        tagList={tagList?.data}
        tags={tags}
      />
    );
  }
  return <>{content}</>;
}
