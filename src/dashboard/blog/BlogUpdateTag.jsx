import React, { useEffect, useState } from "react";
import styles from "./blogCustom.module.css";

export default function BlogUpdateTag({ tags, tagList, setTagsResponse }) {
  const [checkedState, setCheckedState] = useState([]);
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < tagList.length; i++) {
      const isSelected =
        tags.findIndex((el) => el.id === tagList[i].id) === -1 ? false : true;
      arr.push({ ...tagList[i], isChecked: isSelected });
    }
    setCheckedState(arr);
    setTagsResponse(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      if (item.id === position) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setCheckedState(updatedCheckedState);
    setTagsResponse(updatedCheckedState);
  };

  return (
    <>
      {checkedState &&
        checkedState.map((tag, index) => (
          <div className="form-check form-check-inline" key={tag?.id}>
            <input
              className={`${styles.checkBox}`}
              type="checkbox"
              id={`custom-checkbox-${tag?.id}`}
              value={tag?.id}
              checked={tag?.isChecked}
              onChange={() => handleOnChange(tag?.id)}
            />
            <label
              className={`${styles.formLabel}`}
              htmlFor={`custom-checkbox-${tag?.id}`}
            >
              <span className={`${styles.labelPadding}`}>
                {tag?.attributes?.title}
              </span>
            </label>
          </div>
        ))}
    </>
  );
}
