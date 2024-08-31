/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect } from 'react';

const Carousel: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (slideIndex: number) => {
    setActiveSlide(slideIndex);
  };

  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {[...Array(totalSlides)].map((_, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              activeSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            data-carousel-item
          >
            <img
              src={`/img${index + 1}.png`}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {[...Array(totalSlides)].map((_, index) => (
          <button   
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              activeSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            aria-current={activeSlide === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
      {/* Slider controls Removed*/}
      
    </div>
  );
};

export default Carousel;