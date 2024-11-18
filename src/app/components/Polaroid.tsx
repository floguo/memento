"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { ImageData } from "./ImageData";

const Polaroid = ({ src, alt, caption, date }: ImageData) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!isHovered) return;

      const element = e.currentTarget;
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setMousePosition({ x, y });
    },
    [isHovered]
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setIsHovered(true);

    // Dynamically set mousePosition based on cursor entry
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y }); // Start the light at the cursor entry point
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Light reflection effect
  const lightStyle = {
    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
      rgba(255, 255, 255, 0.25) 0%, 
      rgba(255, 255, 255, 0.1) 40%, 
      rgba(255, 255, 255, 0) 70%)`,
    position: "absolute" as const,
    inset: 0,
    pointerEvents: "none" as const,
    transition: isHovered ? "opacity 0.3s ease-in, background 0.3s ease-in" : "opacity 0.6s ease-out", // Smooth transitions
    borderRadius: "inherit",
    opacity: isHovered ? 1 : 0, // Gradual appearance/disappearance
  };

  // 3D Tilt effect
  const rotateX = isHovered ? (mousePosition.y - 0.5) * -20 : 0; // Stronger rotation on Y-axis
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 20 : 0; // Stronger rotation on X-axis

  return (
    <div
      className="flex flex-col items-center bg-white rounded p-4 m-4 ring-1 ring-black/[0.02] shadow-md max-w-xs relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s ease-out",
        transformOrigin: "center", // Ensure the card tilts around its center
      }}
    >
      {/* Image */}
      <Image src={src} alt={alt} width={240} height={240} draggable={false} className="rounded-sm" />

      {/* Light Reflection */}
      <div style={lightStyle} />

      {/* Caption and Date */}
      {caption && <p className="mt-4 text-sm text-gray-800">{caption}</p>}
      {date && <p className="mt-0.5 text-xs text-gray-500">{date}</p>}
    </div>
  );
};

export default Polaroid;