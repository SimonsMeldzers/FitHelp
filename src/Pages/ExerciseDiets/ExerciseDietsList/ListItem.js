import React from "react";
import { useNavigate } from "react-router-dom";

export default function ListItem({
  title,
  image,
  documentId,
  collectionType,
  groupId,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="ListItem"
      onClick={() =>
        navigate(
          "/exercise-diets-detail/" +
            collectionType +
            "/" +
            documentId +
            "/" +
            groupId
        )
      }
    >
      <div
        className="img"
        style={{
          backgroundImage: `url(${
            image ||
            "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
          })`,
        }}
      ></div>
      <div>
        <p> {title} </p>
      </div>
    </div>
  );
}
