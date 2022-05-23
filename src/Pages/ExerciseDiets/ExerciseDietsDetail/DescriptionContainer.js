import React from "react";
import Heading from "./Heading";
export default function DescriptionContainer({ heading, description }) {
  return (
    <div className="descriptionContainer" style={{ flex: 1 }}>
      <Heading heading={heading} />
      <div>
        <p>{description || "There should be description"}</p>
      </div>
    </div>
  );
}
