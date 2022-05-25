import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
export default function CarouselComp({ images }) {
  return (
    <div style={{ flex: 0.9 }}>
      {/* Pārbaudam, vai bildes ir vairāk par 0. 
      Ja arguments paties, tad no masīva images izvelkam visas attēlu saites, 
      un ievietojam tās img elementā */}
      {images && images.length > 0 ? (
        <Carousel>
          {images &&
            images.length > 0 &&
            images.map((url, index) => (
              <div key={index}>
                <img
                  className="carouselImg"
                  alt="img"
                  style={{ maxHeight: "370px", maxWidth: "100%" }}
                  src={
                    url ||
                    "https://via.placeholder.com/200C/O https://placeholder.com/"
                  }
                />
              </div>
            ))}
        </Carousel>
      ) : (
        <Carousel>
          {/* Ja masīvs images ir tukšs, ievietojam tukšas bildes */}
          {[""].map((url, index) => (
            <div key={index}>
              <img
                className="carouselImg"
                alt="img"
                style={{ maxHeight: "370px", maxWidth: "100%" }}
                src={
                  url ||
                  "https://via.placeholder.com/200C/O https://placeholder.com/"
                }
              />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
