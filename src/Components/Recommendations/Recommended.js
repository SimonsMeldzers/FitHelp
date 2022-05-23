import React from "react";

export default function Recommended({ recommended }) {
  return (
    <div>
      <div>
        <h2>Recommended equipment : </h2>
      </div>

      <div className="recommendedContainer">
        {recommended && recommended.length > 0
          ? recommended.map((url, index) => (
              <div key={index} className="recommendedCard">
                <img src={url} alt="Img" />
              </div>
            ))
          : "There should be recommended equipment"}
      </div>
    </div>
  );
}
