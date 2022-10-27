import React from "react";
import { useGetTagsQuery } from "../../features/tag/tagAPI";
import BlogCreateTag from "./BlogCreateTag";

export default function BlogCreateTags({ setTagsResponse }) {
  const { data: tagList, isLoading, isError } = useGetTagsQuery();
  let content;
  if (isLoading) content = <li>Tags Loading ...</li>;
  if (!isLoading && isError) content = <li>Error while fetching Tags</li>;
  if (!isLoading && !isError) {
    content = (
      <BlogCreateTag
        setTagsResponse={setTagsResponse}
        tagList={tagList?.data}
      />
    );
  }
  return <>{content}</>;
}
