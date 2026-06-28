'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollSequenceProps {
  images: HTMLImageElement[];
  isLoaded: boolean;
}

export function ScrollSequence({ images, isLoaded }: ScrollSequenceProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);
  const [framePercent, setFramePercent] = useState(0);

  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!canvas || !wrapper || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img || !ctx) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Enable high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    };

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Set canvas size matching the High-DPI resolution
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Set display size matching CSS layout
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      drawFrame(currentFrameRef.current);
    };

    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // The scroll starts when wrapper's top meets screen top, ends when bottom meets screen bottom
      const totalScrollable = rect.height - viewHeight;
      if (totalScrollable <= 0) return;

      const scrollProgress = -rect.top / totalScrollable;
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      const frameIndex = Math.floor(clampedProgress * (images.length - 1));

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
        setFramePercent(clampedProgress);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial configuration
    resizeCanvas();
    handleScroll();

    // Trigger a delayed resize to ensure rect coordinates match fully after layout finishes
    const timer = setTimeout(() => {
      resizeCanvas();
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [images, isLoaded]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-[220vh] bg-transparent"
    >
      {/* Sticky container for the mockup frame */}
      <div className="sticky top-[15vh] w-full h-[70vh] flex flex-col items-center justify-center px-4">
        {/* Frame container: Sized exactly to prevent pixelation of 736x414 image */}
        <div
          ref={containerRef}
          className="relative w-full max-w-[736px] aspect-video rounded-2xl border border-zinc-800 bg-zinc-950 p-[1px] shadow-2xl shadow-amber-500/5 group"
        >
          {/* Neon-glow border accent */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-indigo-500/10 rounded-2xl opacity-100 transition-opacity pointer-events-none" />

          {/* Canvas Element */}
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-2xl object-cover pointer-events-none z-10"
          />

          {/* Styled Overlay Vignette for Cinematic Look */}
          <div className="absolute inset-0 rounded-2xl bg-radial-vignette pointer-events-none mix-blend-multiply opacity-40 z-20" />

          {/* Frame indicator */}
          <div className="absolute bottom-4 right-4 z-30 bg-black/60 backdrop-blur-md border border-zinc-800 rounded-full px-3 py-1 text-[10px] font-mono text-zinc-400 tracking-wider flex items-center gap-2 select-none">
            <span>SEQUENCE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-white font-bold">
              {String(Math.round(framePercent * (images.length - 1)) + 1).padStart(3, '0')}
            </span>
          </div>

          {/* Scroll instruction marker */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold font-mono tracking-widest text-zinc-600 uppercase">
              Scroll to Scrub Sequence
            </span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-zinc-600 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
