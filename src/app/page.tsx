import Image from "next/image";
import React from "react";

export interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  date?: string;
}

const images: ImageData[] = [
  { 
    src: "/img/img_bodega_nov_17_2024.webp", 
    alt: "The homies outside Lucky's Bodega", 
    caption: "LUCKY’S BODEGA",
    date: "NOV 17, 2024"
  },
  { 
    src: "/img/img_film_nov_10_2024.webp", 
    alt: "Socratica Film Festival 2024", 
    caption: "SOCRATICA FILM FESTIVAL",
    date: "NOV 10, 2024"
  },
  { 
    src: "/img/img_honne_nov_13_2024.webp", 
    alt: "Honne onstage at their Toronto show", 
    caption: "HONNE IN TORONTO",
    date: "NOV 13, 2024"
  },
  { 
    src: "/img/img_tyfe_nov_08_2024.webp", 
    alt: "Smiling Flo making a heart with her arms", 
    caption: "TYFE <3",
    date: "NOV 8, 2024"
  },
  { 
    src: "/img/img_actinolite_nov_08_2024.webp", 
    alt: "Dinner at Actinolite with Ben",
    caption: "ACTINOLITE - OSSINGTON",
    date: "NOV 8, 2024"
  }
];

function Polaroid({ src, alt, caption, date }: ImageData) {
  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 m-4 max-w-xs">
      <div className="bg-gray-200 p-2 rounded-lg">
        <Image src={src} alt={alt} width={240} height={240} className="rounded-lg" />
      </div>
      {caption && <p className="mt-2 text-sm font-semibold text-gray-800">{caption}</p>}
      {date && <p className="text-xs text-gray-500 mt-1">{date}</p>}
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-wrap justify-center items-center">
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