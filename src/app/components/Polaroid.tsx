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

      const targetX = x;
      const targetY = y;
      const currentX = mousePosition.x;
      const currentY = mousePosition.y;

      setMousePosition({
        x: currentX + (targetX - currentX) * 0.2,
        y: currentY + (targetY - currentY) * 0.2,
      });
    },
    [isHovered, mousePosition]
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 }); // Reset to center
  };

  // Light reflection effect
  const lightStyle = {
    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
      rgba(255, 255, 255, 0.3) 0%, 
      rgba(255, 255, 255, 0.1) 30%, 
      rgba(255, 255, 255, 0) 70%)`,
    position: "absolute" as const,
    inset: 0,
    pointerEvents: "none" as const,
    transition: "opacity 0.6s ease-out, background 0.3s ease-out", // Smooth opacity and background transition
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
      <Image src={src} alt={alt} width={240} height={240} className="rounded-sm" />

      {/* Light Reflection */}
      <div style={lightStyle} />

      {/* Caption and Date */}
      {caption && <p className="mt-4 text-sm text-gray-800">{caption}</p>}
      {date && <p className="mt-0.5 text-xs text-gray-500">{date}</p>}
    </div>
  );
};

export default Polaroid;