"use client";
import React, { useState, useCallback } from "react";
import Polaroid from "./components/Polaroid";
import { images } from "./components/ImageData";

export default function Page() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 flex flex-wrap justify-center items-center gap-4 p-8">
      {images.map((image, index) => (
        <div
          key={index}
          className={`transform transition-transform duration-300 ${
            hoveredIndex === index ? "scale-105 rotate-1" : "scale-100"
          }`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <Polaroid
            src={image.src}
            alt={image.alt}
            caption={image.caption}
            date={image.date}
          />
        </div>
      ))}
    </div>
  );
}