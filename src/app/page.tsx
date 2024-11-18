"use client";
import React, { useState, useCallback } from "react";
import { images, ImageData } from "./components/ImageData";
import Polaroid from "./components/Polaroid";
import { inspect } from "util";

// Card component: React fundtional componet that tracks and interprets mouse movements
const Card = ({ 
  photo, 
  style, 
  isActive 
}: { 
  photo: string, 
  style: React.CSSProperties,
  isActive: boolean 
}) => { 
  // React hook to store & update mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!isHovered) return;
  
    const element = e.currentTarget; // The element the event is attached to
    const rect = element.getBoundingClientRect(); // Get the dimensions of the element
    const x = (e.clientX - rect.left) / rect.width; // Mouse X position relative to the element
    const y = (e.clientY - rect.top) / rect.height; // Mouse Y position relative to the element
  
    // Smoother mouse tracking
    const targetX = x;
    const targetY = y;
    const currentX = mousePosition.x;
    const currentY = mousePosition.y;
  
    // Interpolation to create a smooth tracking effect
    setMousePosition({
      x: currentX + (targetX - currentX) * 0.2,
      y: currentY + (targetY - currentY) * 0.2,
    });
    
    // Interpolate mouse position for smoother tracking
    setMousePosition({
      x: currentX + (targetX - currentX) * 0.2,
      y: currentY + (targetY - currentY) * 0.2,
    });
  }, [isHovered, mousePosition]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Light reflection effect
  const lightStyle = {
    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0) 70%) 30%,
    rgba(255, 255, 255, 0) 60%`,
    position: 'absolute' as const,
    inset: 0,
    pointerEvents: 'none' as const,
    transition: isHovered ? 'none' : 'all 1.2s cubic-bezier(0.19, 1, 0.22, 1)',
    borderRadius: 'inherit',
  };

  const rotateX = isHovered ? (mousePosition.y - 0.5) * -7 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 7 : 0;

  return (
    <div
      onMouseMove={isActive ? handleMouseMove : undefined}
      onMouseEnter={isActive ? handleMouseEnter : undefined}
      onMouseLeave={isActive ? handleMouseLeave : undefined}
      style={{ 
        ...style, 
        transform: isActive 
        ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` 
        : style.transform,
      }}
    >
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
    </div>
  );
}

export default function Page() {
  return (
    <Card photo={images[0].src} style={{}} isActive={true} />
  );
}