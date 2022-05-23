import React from "react";
import { useNavigate } from "react-router-dom";

export default function GoBack() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} style={{ margin: 20, cursor: "pointer" }}>
      {"<"} Go Back
    </div>
  );
}
