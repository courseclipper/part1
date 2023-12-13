import React, { useState } from "react";
import { SliderData } from "./sliderData";
import "../Home/imageSlider.css";
// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section
      className="slider"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} /> */}
      <ArrowBackIosIcon className="right-arrow" onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img
                src={slide.image}
                style={{
                  height: "100%",
                  borderRadius: "8px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                }}
                alt="travel image"
                className="image42"
              />
            )}
          </div>
        );
      })}
      <ArrowForwardIosIcon className="right-arrow" onClick={nextSlide} />
    </section>
  );
};

export default ImageSlider;
