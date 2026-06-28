'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { Preloader } from '../components/preloader/Preloader';

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [startPageAnimations, setStartPageAnimations] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (showPreloader) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [showPreloader]);

  // Handle GSAP page entrance animations
  useEffect(() => {
    if (!startPageAnimations) return;

    const ctx = gsap.context(() => {
      // Nav items
      gsap.from('.nav-animate', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Hero elements
      gsap.from('.hero-animate', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.1,
      });

      // Code editor preview container
      gsap.from('.hero-ui-animate', {
        scale: 0.95,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.5,
      });
    });

    return () => ctx.revert();
  }, [startPageAnimations]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setStartPageAnimations(true);
  };

  return (
    <>
      {/* 1. Scroll-Driven Preloader */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* 2. Homepage Content */}
      <div className={`relative min-h-screen bg-black overflow-hidden flex flex-col ${showPreloader ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100 transition-opacity duration-1000'}`}>
        {/* Ambient Gradient Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-amber-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-indigo-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-black/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="nav-animate flex items-center gap-2 group">
              <span className="text-white font-extrabold tracking-widest text-lg uppercase font-sans">
                GM Techies
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            </a>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              {['Curriculum', 'Labs', 'Keynotes', 'About'].map((item, idx) => (
                <a
                  key={idx}
                  href={`#${item.toLowerCase()}`}
                  className="nav-animate text-zinc-400 hover:text-white text-sm font-medium tracking-wide uppercase transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="nav-animate">
              <a
                href="#apply"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-zinc-200 transition-all duration-300 transform active:scale-95"
              >
                Apply Now
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 z-10 flex flex-col items-center">
          <div className="text-center max-w-4xl flex flex-col items-center">
            {/* Pulsing Tag */}
            <div className="hero-animate inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-semibold tracking-wider text-amber-500 uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Staged for Autumn 2026
            </div>

            {/* Main Headline */}
            <h2 className="hero-animate text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-8 font-sans">
              Engineering the <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Future of Technology
              </span>
            </h2>

            {/* Subtitle */}
            <p className="hero-animate text-zinc-400 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-12">
              A premium, immersive educational platform built for elite engineers.
              Master production-grade systems programming, distributed databases,
              and advanced frontend performance.
            </p>

            {/* CTA Buttons */}
            <div className="hero-animate flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <a
                href="#curriculum"
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-bold text-black hover:bg-zinc-200 shadow-[0_0_30px_rgba(251,191,36,0.15)] transition-all duration-300 transform active:scale-95"
              >
                Explore Curriculums
              </a>
              <a
                href="#keynote"
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full border border-zinc-700 bg-transparent px-8 text-base font-bold text-white hover:bg-zinc-900 hover:border-zinc-500 transition-all duration-300 transform active:scale-95"
              >
                Watch Keynote
              </a>
            </div>
          </div>

          {/* Interactive UI Mock / Editor Preview */}
          <div className="hero-ui-animate w-full max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-950/80 p-1 md:p-2 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent rounded-2xl pointer-events-none" />
            
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-zinc-950 rounded-t-xl">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-zinc-800" />
                <span className="w-3 h-3 rounded-full bg-zinc-800" />
                <span className="w-3 h-3 rounded-full bg-zinc-800" />
              </div>
              <span className="text-xs font-mono text-zinc-500">gm_techies_kernel.rs</span>
              <div className="w-14" />
            </div>

            {/* Editor Body */}
            <div className="p-6 md:p-8 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto leading-relaxed bg-zinc-950/40">
              <div className="text-zinc-500">// Initialize high-frequency compilation pipeline</div>
              <div>
                <span className="text-amber-500">fn</span> <span className="text-indigo-400">main</span>() &#123;
              </div>
              <div className="pl-6">
                <span className="text-amber-500">let</span> engine = GMTechiesEngine::<span className="text-blue-400">new</span>();
              </div>
              <div className="pl-6 text-zinc-500">
                // Optimization pipeline loaded (75/75 frames active)
              </div>
              <div className="pl-6">
                engine.optimize_learning_rate(<span className="text-emerald-400">0.99</span>);
              </div>
              <div className="pl-6">
                engine.render_visual_pipeline();
              </div>
              <div className="pl-6 text-emerald-400">
                println!(<span className="text-amber-300">&quot;Compilation Successful. System ready.&quot;</span>);
              </div>
              <div>&#125;</div>
            </div>
          </div>
        </main>

        {/* Curriculums Bento Grid */}
        <section id="curriculum" className="w-full bg-zinc-950 border-t border-zinc-900 py-24 z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center md:text-left max-w-2xl mb-16">
              <h3 className="text-xs font-bold tracking-widest text-amber-500 uppercase mb-4">
                Core Curriculums
              </h3>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
                Hardcore engineering pathways.
              </h2>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="md:col-span-2 rounded-2xl border border-zinc-900 bg-zinc-900/30 p-8 hover:border-zinc-800 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h4 className="text-xl font-bold text-white mb-3">Systems & Low-Level Programming</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Deep dive into Rust, C++, and Assembly. Write high-performance kernels,
                  understand compiler optimizations, and develop customized database engines from scratch.
                </p>
                <span className="text-xs font-bold text-amber-500 tracking-wider uppercase group-hover:translate-x-1.5 inline-block transition-transform duration-300">
                  Read Syllabus &rarr;
                </span>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                className="rounded-2xl border border-zinc-900 bg-zinc-900/30 p-8 hover:border-zinc-800 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h4 className="text-xl font-bold text-white mb-3">Creative Frontend</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Build visually gorgeous layouts with custom WebGL shaders, Canvas rendering, and advanced physics engines.
                </p>
                <span className="text-xs font-bold text-amber-500 tracking-wider uppercase group-hover:translate-x-1.5 inline-block transition-transform duration-300">
                  Read Syllabus &rarr;
                </span>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="rounded-2xl border border-zinc-900 bg-zinc-900/30 p-8 hover:border-zinc-800 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h4 className="text-xl font-bold text-white mb-3">Distributed Core</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Master Raft, Paxos, and multi-region replication. Learn to handle packet drop, split-brain scenarios, and scale storage.
                </p>
                <span className="text-xs font-bold text-amber-500 tracking-wider uppercase group-hover:translate-x-1.5 inline-block transition-transform duration-300">
                  Read Syllabus &rarr;
                </span>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                className="md:col-span-2 rounded-2xl border border-zinc-900 bg-zinc-900/30 p-8 hover:border-zinc-800 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h4 className="text-xl font-bold text-white mb-3">Large Scale Machine Learning</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Train and optimize models on distributed clusters. Learn hardware-accelerated computation using GPU programming and custom inference engines.
                </p>
                <span className="text-xs font-bold text-amber-500 tracking-wider uppercase group-hover:translate-x-1.5 inline-block transition-transform duration-300">
                  Read Syllabus &rarr;
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-zinc-900 bg-black py-12 z-10 text-center">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-xs font-mono text-zinc-500">
              &copy; {new Date().getFullYear()} GM Techies. Designed like an Art.
            </span>
            <div className="flex items-center gap-6">
              {['Terms', 'Privacy', 'Contact'].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-xs font-mono text-zinc-500 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
