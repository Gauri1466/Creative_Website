'use client';

import { useState, useEffect, useRef } from 'react';

interface UsePreloaderResult {
  progress: number;
  isLoaded: boolean;
  images: HTMLImageElement[];
}

export function usePreloader(totalFrames: number = 75): UsePreloaderResult {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let isCancelled = false;

    const loadImage = (index: number) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        const frameStr = String(index).padStart(3, '0');
        img.src = `/assets/preloader/ezgif-frame-${frameStr}.png`;

        img.onload = () => {
          if (isCancelled) return;
          loadedCountRef.current += 1;
          setProgress(Math.round((loadedCountRef.current / totalFrames) * 100));
          resolve(img);
        };

        img.onerror = () => {
          console.error(`Failed to load frame ${frameStr}`);
          if (isCancelled) return;
          // Resolve anyway so we do not block the entire preloader
          loadedCountRef.current += 1;
          setProgress(Math.round((loadedCountRef.current / totalFrames) * 100));
          resolve(img);
        };
      });
    };

    const loadAll = async () => {
      const promises: Promise<HTMLImageElement>[] = [];
      for (let i = 1; i <= totalFrames; i++) {
        promises.push(loadImage(i));
      }

      const results = await Promise.all(promises);
      if (!isCancelled) {
        setImages(results);
        setIsLoaded(true);
      }
    };

    loadAll();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames]);

  return { progress, isLoaded, images };
}
