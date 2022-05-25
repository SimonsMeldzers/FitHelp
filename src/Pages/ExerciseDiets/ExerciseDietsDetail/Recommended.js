import React from "react";

export default function Recommended({ recommended }) {
  return (
    <div>
      <div>
        <h2>Recommended equipment : </h2>
      </div>

      <div className="recommendedContainer">
        {/* Veicam pārbaudi vai masīva ar attēliem ir attēlu saites.
        Ja ir izvadam attēlus ar bildēm no masīva,
        ja nav rakstam "There should be recomended equipment" */}
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
