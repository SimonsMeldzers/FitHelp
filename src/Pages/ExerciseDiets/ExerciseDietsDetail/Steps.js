import React from "react";

export default function Steps({ steps }) {
  return (
    <div className="StepContainer">
      <h2>Steps</h2>

      {steps && steps.length > 0
        ? steps.map((step, index) => (
            <div key={index} className="StepItem">
              <p>{step}</p>
            </div>
          ))
        : "There should be steps"}
    </div>
  );
}
