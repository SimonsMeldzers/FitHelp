import React from "react";

export default function Heading({ heading }) {
  return (
    <div className="exerciseDietsHeading">
      <h2> {heading || "There should be Headings"} </h2>
    </div>
  );
}
