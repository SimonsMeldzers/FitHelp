import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
export default function CarouselComp({ images }) {
  return (
    <div style={{ flex: 0.9 }}>
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
