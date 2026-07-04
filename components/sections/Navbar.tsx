'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Courses', href: '#courses' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 pt-4 pointer-events-none transition-all duration-300">
      <div 
        className={`pointer-events-auto max-w-6xl mx-auto border border-card-border/50 bg-background/80 backdrop-blur-md shadow-lg transition-all duration-300 ${
          mobileMenuOpen ? 'rounded-[28px] py-4' : 'rounded-full py-2.5 md:py-3'
        } px-6 flex flex-col md:flex-row md:items-center justify-between`}
      >
        {/* Main Row */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-extrabold text-base shadow-md group-hover:scale-105 transition-transform">
              GM
            </div>
            <span className="text-foreground font-extrabold tracking-tight text-lg uppercase font-heading">
              Techies
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </a>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-card-border bg-card-bg/40 text-text-muted hover:text-primary transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-7.072 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-card-border bg-card-bg/40 text-text-muted hover:text-primary transition-all cursor-pointer"
              aria-label="Toggle Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-text-muted hover:text-primary font-bold text-sm tracking-wide transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-card-border bg-card-bg/40 text-text-muted hover:text-primary hover:border-primary/50 transition-all duration-300 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-7.072 0z" />
              </svg>
            ) : (
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <a
            href="#login"
            className="text-xs font-bold text-text-muted hover:text-primary px-3 py-1.5 transition-colors duration-200"
          >
            Sign In
          </a>

          <a
            href="#contact"
            className="btn-3d-primary btn-shine text-xs px-5 py-2.5 shadow-xs"
          >
            Get started
          </a>
        </div>

        {/* Mobile Drawer (Nested inside expanding pill) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden w-full overflow-hidden"
            >
              <div className="flex flex-col gap-3 pt-6 pb-2 border-t border-card-border/30 mt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-text-muted hover:text-primary font-bold text-sm py-2 px-1 border-b border-card-border/10 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                
                <div className="flex flex-col gap-3 pt-4">
                  <a
                    href="#login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-full border border-card-border text-xs font-bold text-text-muted hover:text-primary transition-colors"
                  >
                    Sign In
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-3d-primary btn-shine text-center py-2.5 text-xs font-bold w-full"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
