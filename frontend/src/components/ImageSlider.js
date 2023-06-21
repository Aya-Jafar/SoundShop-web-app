import { useState } from "react";

import pic2 from "./Copy3.png";
import pic3 from "./copy1.png";
import pic4 from "./copy4.png";
import pic5 from "./copy5.png";

export default function ImageSlider(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  let slides = [pic3, pic2, pic4, pic5];


  const sliderStyle = {
    height: "100%",
    position: "relative",
    objectFit: "contain",
  };

  const divStyle = {
    width: "100%",
    height: "440px",
    backgroundImage: `url(${slides[currentIndex]})`,
    backgroundPosition: "center",
    transition: "background-image 0.5s ease-in-out",
  };

  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const textStyle = {
    position: "absolute",
    top: 200,
    left: 150,
    zIndex: 2,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0)",
    backdropFilter: "blur(15px)",
    fontSize: "45px",
    lineHeight: "100px",
    letterSpacing: "20px",
    fontWeight: "400",
    textAlign: "center",
  };

  return (
    <div style={{ position: "relative" }}>
      <h2 style={textStyle}>{"Show your glory".toUpperCase()}</h2>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>

      <div style={sliderStyle}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              ...divStyle,
              opacity: index === currentIndex ? 1 : 0,
              position: index === currentIndex ? "relative" : "absolute",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
