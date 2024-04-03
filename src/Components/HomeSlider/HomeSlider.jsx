import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <img style={ { height : "300px"} } className="w-100" src= { require ( '../../images/slider-image-1.jpeg' ) }   alt="slider-img-1" />
      </div>
      <div>
        <img style={ { height : "300px"} } className="w-100" src= { require ( '../../images/slider-image-2.jpeg' ) }   alt="slider-img-2" />
      </div>
      <div>
        <img style={ { height : "300px"} } className="w-100" src= { require ( '../../images/slider-image-3.jpeg' ) }   alt="slider-img-3" />
      </div>
      <div>
        <img style={ { height : "300px"} } className="w-100" src= { require ( '../../images/slider-image-2.jpeg' ) }   alt="slider-img-4" />
      </div>
    </Slider>
  );
}
