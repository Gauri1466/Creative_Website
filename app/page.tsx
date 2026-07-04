'use client';

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { motion } from 'framer-motion';

// Import modular sections
import Navbar from '../components/sections/Navbar';
import Hero from '../components/sections/Hero';
import TrustedCompanies from '../components/sections/TrustedCompanies';
import CourseCategories from '../components/sections/CourseCategories';
import FeaturedInternships from '../components/sections/FeaturedInternships';
import InterviewPrep from '../components/sections/InterviewPrep';
import LearningRoadmaps from '../components/sections/LearningRoadmaps';
import TechnicalSkills from '../components/sections/TechnicalSkills';
import Mentors from '../components/sections/Mentors';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('dark');
    }
  }, []);

  // Sync theme with HTML document node class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
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
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[45%] right-0 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[65%] left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[110px] pointer-events-none z-0" />
      <div className="absolute top-[85%] right-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Floating Decorative Orbs / Bubbles across the page */}
      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-[15%] left-[5%] w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-accent opacity-25 blur-xs pointer-events-none z-10 hidden sm:block"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[30%] right-[8%] w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-primary opacity-20 blur-xs pointer-events-none z-10 hidden sm:block"
      />
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[48%] left-[12%] w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-accent opacity-25 blur-xs pointer-events-none z-10 hidden md:block"
      />
      <motion.div
        animate={{ y: [0, 12, 0], x: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-[65%] right-[10%] w-7 h-7 rounded-full bg-gradient-to-tr from-accent to-primary opacity-30 blur-xs pointer-events-none z-10 hidden sm:block"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-[80%] left-[8%] w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent opacity-20 blur-xs pointer-events-none z-10 hidden sm:block"
      />
      <motion.div
        animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 7.5, ease: 'easeInOut', delay: 2.5 }}
        className="absolute top-[93%] right-[12%] w-6 h-6 rounded-full bg-gradient-to-tr from-accent to-primary opacity-25 blur-xs pointer-events-none z-10 hidden md:block"
      />

      {/* 1. Premium Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Layout */}
      <main className="flex-1 w-full flex flex-col z-10">
        
        {/* 2. Hero Section */}
        <Hero />
        
        {/* 3. Trusted Companies */}
        <TrustedCompanies />
        
        {/* 4. Course Categories (Search + Catalog) */}
        <CourseCategories />
        
        {/* 5. Featured Internships */}
        <FeaturedInternships />
        
        {/* 6. Company-Specific Interview Preparation */}
        <InterviewPrep />
        
        {/* 7. Personalized Learning Roadmaps */}
        <LearningRoadmaps />
        
        {/* 8. Master Core Technical Skills */}
        <TechnicalSkills />
        
        {/* 9. Experience Learning with Mentors (Benefits) */}
        <Mentors />
        
        {/* 10. Testimonials */}
        <Testimonials />
        
        {/* 11. Contact Form */}
        <Contact />
        
      </main>

      {/* 12. Footer */}
      <Footer />
      
    </div>
  );
}
