'use client';

import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail('');
  };

  return (
    <footer id="footer" className="w-full bg-[#1E1E2D] text-white/80 border-t border-white/10 pt-16 pb-8 relative z-25">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
        
        {/* Column 1: Logo & Brand statement */}
        <div className="lg:col-span-4 flex flex-col items-start gap-4">
          <a href="#" className="flex items-center gap-2 group text-white">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-extrabold text-lg shadow-md">
              GM
            </div>
            <span className="text-white font-extrabold tracking-tight text-xl uppercase font-heading">
              Techies
            </span>
          </a>
          <p className="text-xs text-white/60 leading-relaxed max-w-sm">
            Empowering learners to build the future through skills, creativity, and real-world learning.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-2">
            {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
              <a
                key={social}
                href={`#${social}`}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary text-white/50 hover:text-white transition-all cursor-pointer"
                aria-label={`Visit our ${social}`}
              >
                <span className="sr-only">{social}</span>
                {social === 'facebook' && (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                )}
                {social === 'twitter' && (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                )}
                {social === 'linkedin' && (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                )}
                {social === 'instagram' && (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-2">
          <h4 className="font-heading font-extrabold text-xs uppercase tracking-widest text-white mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-xs text-white/50">
            <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
            <li><a href="#courses" className="hover:text-primary transition-colors">Courses</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="lg:col-span-2">
          <h4 className="font-heading font-extrabold text-xs uppercase tracking-widest text-white mb-4">Support</h4>
          <ul className="space-y-2.5 text-xs text-white/50">
            <li><a href="#help" className="hover:text-primary transition-colors">Help Center</a></li>
            <li><a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#refund" className="hover:text-primary transition-colors">Refund Policy</a></li>
          </ul>
        </div>

        {/* Column 4: Company */}
        <div className="lg:col-span-2">
          <h4 className="font-heading font-extrabold text-xs uppercase tracking-widest text-white mb-4">Company</h4>
          <ul className="space-y-2.5 text-xs text-white/50">
            <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#careers" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#blog" className="hover:text-primary transition-colors">Blog</a></li>
            <li><a href="#press" className="hover:text-primary transition-colors">Press Kit</a></li>
          </ul>
        </div>

        {/* Column 5: Newsletter Sign-up */}
        <div className="lg:col-span-2">
          <h4 className="font-heading font-extrabold text-xs uppercase tracking-widest text-white mb-4">Subscribe</h4>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <p className="text-[10px] text-white/40 leading-relaxed mb-1">
              Subscribe to our newsletter for the latest tech learning updates.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/20 focus:outline-hidden focus:ring-1 focus:ring-primary w-full"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2 px-4 rounded-xl cursor-pointer transition-colors shadow-xs"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[10px] text-white/40 font-medium">
          &copy; {new Date().getFullYear()} GM Techies. All rights reserved.
        </span>
        <span className="text-[10px] text-white/30 font-mono">
          Made with &hearts; for developers
        </span>
      </div>
    </footer>
  );
}
