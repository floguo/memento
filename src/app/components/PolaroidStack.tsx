// components/PolaroidStack.tsx
"use client";
import React, { useState, useCallback } from "react";
import Polaroid from "./Polaroid";
import { ImageData } from "./ImageData";
// import { ChevronLeft, ChevronRight } from "lucide-react";

interface PolaroidStackProps {
  images: ImageData[];
}

const PolaroidStack: React.FC<PolaroidStackProps> = ({ images }) => {
  const [stack, setStack] = useState(
    images.map((img, i) => ({
      ...img,
      rotation: (i % 2 === 0 ? 1 : -1) * (2 + Math.random()), // Alternating random rotation
    }))
  );
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getCardStyle = (index: number) => {
    const baseRotation = stack[index].rotation || 0;
    
    // Calculate stacking position
    const stackOffset = {
      x: index * 0.5,
      y: index * 1.5
    };

    // Calculate drag movement
    const dragProgress = Math.min(Math.abs(offsetX) / 200, 1);
    let moveX = 0;
    let moveY = 0;
    let extraRotation = 0;

    if (isDragging || offsetX !== 0) {
      if (index === 0) {
        moveX = offsetX;
        moveY = -Math.sin(dragProgress * Math.PI) * 15;
        extraRotation = (offsetX / 200) * 8;
      } else {
        const followStrength = Math.max(0, 1 - index * 0.3);
        moveX = offsetX * followStrength * 0.1;
        moveY = dragProgress * index * -0.3;
      }
    }

    return {
      transform: `translate(${stackOffset.x + moveX}px, ${stackOffset.y + moveY}px) rotate(${baseRotation + extraRotation}deg)`,
      position: 'absolute' as const,
      width: '100%',
      zIndex: images.length - index,
      transition: isDragging 
        ? 'none' 
        : 'all 1.2s cubic-bezier(0.19, 1, 0.22, 1)',
    };
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    setStartX(clientX - offsetX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || isAnimating) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setOffsetX(clientX - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging || isAnimating) return;
    setIsDragging(false);
    
    if (Math.abs(offsetX) > 100) {
      animateCardTransition(offsetX > 0 ? 'backward' : 'forward');
    } else {
      setOffsetX(0);
    }
  };

  const animateCardTransition = (direction: 'forward' | 'backward') => {
    setIsAnimating(true);
    
    // Pre-animation setup
    const targetOffset = direction === 'forward' ? -200 : 200;
    setOffsetX(targetOffset);
    
    // Smooth transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setStack(prev => 
          direction === 'forward'
            ? [...prev.slice(1), prev[0]]
            : [prev[prev.length - 1], ...prev.slice(0, -1)]
        );
        setOffsetX(0);
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 1200);
      });
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 h-[600px]">
      <div className="relative h-full">
        {/* Edge fade gradients */}
        <div className="absolute inset-0 pointer-events-none z-[201]">
          <div className="absolute left-0 w-40 h-full bg-gradient-to-r from-stone-100 via-stone-100/80 to-transparent" />
          <div className="absolute right-0 w-40 h-full bg-gradient-to-l from-stone-100 via-stone-100/80 to-transparent" />
        </div>

        {/* <button
          onClick={() => !isAnimating && animateCardTransition('backward')}
          disabled={isAnimating}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg z-[200] hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => !isAnimating && animateCardTransition('forward')}
          disabled={isAnimating}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg z-[200] hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button> */}

        <div 
          className="relative w-full h-full"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onMouseMove={handleDragMove}
          onTouchMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchEnd={handleDragEnd}
          onMouseLeave={handleDragEnd}
          style={{ 
            touchAction: 'none',
            userSelect: 'none',
            perspective: '1000px'
          }}
        >
          {stack.map((photo, index) => (
            <div key={photo.src} style={getCardStyle(index)}>
              <Polaroid
                src={photo.src}
                alt={photo.alt}
                caption={photo.caption}
                date={photo.date}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolaroidStack;