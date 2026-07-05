'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-36 pb-16 md:pt-48 md:pb-24 overflow-hidden bg-background">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-10 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-accent/5 rounded-full blur-[90px] pointer-events-none z-0" />

      {/* Floating Decorative Orbs to match the illustration style */}
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-20 left-10 md:left-24 w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent opacity-30 blur-xs hidden sm:block"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-24 left-[40%] w-6 h-6 rounded-full bg-accent opacity-20 blur-xs hidden sm:block"
      />
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 2 }}
        className="absolute top-32 right-12 w-10 h-10 rounded-full bg-primary opacity-25 blur-xs hidden md:block"
      />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* Left Column: Text & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left lg:pr-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-light dark:bg-card-bg/40 border border-primary/20 text-[9px] font-bold tracking-wider text-primary uppercase mb-5 shadow-xs"
          >
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            ✨ Welcome to the future of learning
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] mb-6 font-heading text-foreground"
          >
            Develop your <br />
            skills in a new <br />
            and{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-accent bg-clip-text text-transparent">
              unique way
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text-muted text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl mb-8"
          >
            Develop your skills in a fresh, unique way by exploring hands-on experiences, real-world projects, and expert mentorship. Learn at your own pace and stay ahead in your career.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 w-full sm:w-auto pt-2"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto btn-3d-primary btn-shine h-14 px-8 text-base tracking-wider"
            >
              Enroll now!
            </a>
            
            <a
              href="#watch"
              className="w-full sm:w-auto btn-3d-secondary h-14 px-8 text-base tracking-wider gap-2.5"
            >
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              Watch video
            </a>
          </motion.div>
        </div>

        {/* Right Column: Illustration with Floating Elements */}
        <div className="lg:col-span-5 flex justify-center items-center relative select-none w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
          >
            {/* Illustration */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="relative w-[85%] h-[85%] z-10 drop-shadow-[0_15px_30px_rgba(108,43,211,0.2)] flex items-center justify-center"
            >
              <Image
                src="/assets/lightbulb-meditator-transparent.png"
                alt="Lightbulb Coder Meditating"
                fill
                priority
                className="object-contain"
              />
            </motion.div>

            {/* Floating Wireframe labels: "Code", "Design" */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute left-[-15px] bottom-[20%] z-20 px-4 py-2 rounded-full bg-white dark:bg-card-bg shadow-lg border border-card-border text-xs font-bold text-primary flex items-center gap-1.5"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              &lt;Code /&gt;
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute right-[-15px] top-[30%] z-20 px-4 py-2 rounded-full bg-primary text-white shadow-lg border border-primary/20 text-xs font-bold flex items-center gap-1.5"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Design
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
