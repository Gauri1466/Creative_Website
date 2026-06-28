'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreloader } from './usePreloader';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const { progress, isLoaded, images } = usePreloader(75);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const isFadingOutRef = useRef(false);

  // Disable page scroll while preloader is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Frame drawing function
  const drawFrame = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, index: number) => {
    const img = images[index];
    if (!img) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
  };

  // Main canvas render and scroll listener loop
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      drawFrame(ctx, canvas, Math.round(currentFrameRef.current));
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Wheel and Touch Event Listeners for scrubbing
    const handleWheel = (e: WheelEvent) => {
      if (isFadingOutRef.current) return;
      setHasScrolled(true);
      
      const delta = e.deltaY;
      const sensitivity = 0.04; // "not too fast, not too slow"
      
      targetFrameRef.current = Math.max(0, Math.min(74, targetFrameRef.current + delta * sensitivity));
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isFadingOutRef.current) return;
      setHasScrolled(true);
      
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      const sensitivity = 0.15;
      
      targetFrameRef.current = Math.max(0, Math.min(74, targetFrameRef.current + deltaY * sensitivity));
      touchStartY = currentY;
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // RequestAnimationFrame smooth interpolation tick
    let animationFrameId: number;
    const tick = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      
      if (Math.abs(diff) > 0.001) {
        // Smooth lerping of frames
        currentFrameRef.current += diff * 0.12;
        drawFrame(ctx, canvas, Math.round(currentFrameRef.current));
      }

      // Check if animation completed (reached frame 74)
      if (Math.round(currentFrameRef.current) >= 74 && !isFadingOutRef.current) {
        isFadingOutRef.current = true;
        setIsFadingOut(true);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, images]);

  const handleFadeOutComplete = () => {
    setAnimationCompleted(true);
    onComplete();
  };

  if (animationCompleted) return null;

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={(definition) => {
            if (definition === 'exit' || isFadingOut) {
              handleFadeOutComplete();
            }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none overflow-hidden"
        >
          {/* Centered High-Quality Frame & Canvas */}
          {isLoaded && (
            <div className="flex flex-col items-center justify-center w-full max-w-4xl px-6">
              <div
                ref={containerRef}
                className="relative w-full max-w-[736px] aspect-video rounded-2xl border border-zinc-800 bg-zinc-950 p-[1px] shadow-2xl shadow-amber-500/5 mb-8"
              >
                {/* Glow border */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-indigo-500/5 rounded-2xl pointer-events-none" />

                {/* Canvas */}
                <canvas
                  ref={canvasRef}
                  className="w-full h-full rounded-2xl object-cover pointer-events-none z-10"
                />

                {/* Vignette */}
                <div className="absolute inset-0 rounded-2xl bg-radial-vignette pointer-events-none mix-blend-multiply opacity-50 z-20" />
              </div>

              {/* Scroll Guidance prompt */}
              <AnimatePresence>
                {!hasScrolled && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-3 z-30"
                  >
                    <span className="text-xs font-bold font-mono tracking-widest text-zinc-400 uppercase">
                      Scroll to Enter
                    </span>
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                      className="w-5 h-8 border border-zinc-700 rounded-full flex justify-center p-1"
                    >
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Initial loading phase UI */}
          <AnimatePresence>
            {!isLoaded && (
              <motion.div
                key="loading-ui"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="flex flex-col items-center justify-center text-center z-20 px-8 w-full max-w-md"
              >
                {/* Branding Text */}
                <motion.h1
                  initial={{ letterSpacing: '0.2em', opacity: 0 }}
                  animate={{ letterSpacing: '0.4em', opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="text-white text-2xl md:text-3xl font-extrabold tracking-[0.4em] uppercase font-sans mb-6"
                >
                  GM Techies
                </motion.h1>

                {/* Progress Bar */}
                <div className="w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden mb-3 relative">
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 bg-white"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut', duration: 0.1 }}
                  />
                </div>

                {/* Percentage */}
                <div className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
                  <span>Loading</span>
                  <span className="ml-2 font-bold text-white">
                    {String(progress).padStart(3, '0')}%
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
