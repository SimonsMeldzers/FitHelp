import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ title, image, cardColor, id, collectionType }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        // Izveido saiti priekš apakšgrupām
        navigate("/exercise-diets-list/" + collectionType + "/" + id)
      }
      className="exerciseDietsCard"
      style={{ background: cardColor }}
    >
      <div
        className="img"
        style={{
          // Ja datubāzē ir norādīta bilde, rāda to, ja nav, rāda tukšu bildi
          backgroundImage: `url(${
            image || 
            "https://www.seekpng.com/png/detail/366-3669598_bodybuilding-free-icon-bodybuilding.png"
          })`,
        }}
      ></div>
      <div>
        <p>{title}</p>
      </div>
    </div>
  );
}
