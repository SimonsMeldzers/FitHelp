import React from "react";
import DescriptionContainer from "./DescriptionContainer";
import Carousel from "./Carousel";
export default function InfoContainer({ heading, description, images }) {
  return (
    <div className="infoContainer">
      <Carousel images={images} />
      <DescriptionContainer heading={heading} description={description} />
    </div>
  );
}
