'use client';

import React, { useEffect, useRef } from 'react';

interface CanvasSequenceProps {
  images: HTMLImageElement[];
  isLoaded: boolean;
  onAnimationComplete: () => void;
}

export function CanvasSequence({ images, isLoaded, onAnimationComplete }: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img || !ctx) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      if (imgWidth === 0 || imgHeight === 0) return;

      // Cover scaling logic (aspect fill)
      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;
      const x = (canvasWidth - drawWidth) / 2;
      const y = (canvasHeight - drawHeight) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Set initial dimensions and draw first frame

    const fps = 12; // 12 FPS gives a classic stop-motion animation feel
    const frameInterval = 1000 / fps;

    const tick = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed >= frameInterval) {
        drawFrame(currentFrameRef.current);
        currentFrameRef.current += 1;
        // Compensate for drift but keep frames strictly sequential (no skips)
        lastTimeRef.current = timestamp - (elapsed % frameInterval);
      }

      if (currentFrameRef.current < images.length) {
        animationFrameIdRef.current = requestAnimationFrame(tick);
      } else {
        // Pause briefly (300ms) before transitioning out
        setTimeout(() => {
          onAnimationComplete();
        }, 300);
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [images, isLoaded, onAnimationComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
      style={{ display: isLoaded ? 'block' : 'none' }}
    />
  );
}
