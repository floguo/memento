import Image from "next/image";
import React from "react";
import { images, ImageData } from "./components/ImageData";
import Polaroid from "./components/Polaroid";

export default function Page() {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-wrap justify-center items-center">
      {images.map((image, index) => (
        <Polaroid 
          key={index} 
          src={image.src} 
          alt={image.alt} 
          caption={image.caption} 
          date={image.date} 
        />
      ))}
    </div>
  );
}