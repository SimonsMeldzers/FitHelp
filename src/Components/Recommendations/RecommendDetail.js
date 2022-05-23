import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Footer, Navbar, GoBack } from "../Shared";
import { useParams } from "react-router-dom";
import InfoContainer from "./InfoContainer";
import Steps from "./Steps";
import Recommended from "./Recommended";
import "./style.css";

export default function ExerciseDietsRecommendation() {
  const { recommendedData } = useSelector((state) => state.recommended);
  const dummyImagesIFDataNotAvailable = [
    "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg",
    "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg",
  ];
  return (
    <div>
      <Navbar />

      <div style={{ margin: 30 }}>
        <GoBack />
        <InfoContainer
          images={recommendedData?.images || dummyImagesIFDataNotAvailable}
          heading={recommendedData?.title}
          description={recommendedData?.description}
        />
        <Steps steps={recommendedData?.steps} />
        <Recommended recommended={recommendedData?.recommended} />
      </div>

      <Footer />
    </div>
  );
}
