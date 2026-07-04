'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Aishwarya Patil',
    role: 'SDE-2',
    company: 'Google',
    rating: 5,
    quote: "The DSA and System Design roadmaps were absolute game-changers. I went from being confused about graph problems to comfortably solving hard-level questions in my interviews.",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
  },
  {
    id: 'test-2',
    name: 'Rohan Sharma',
    role: 'Frontend Engineer',
    company: 'Microsoft',
    rating: 5,
    quote: "The React & WebGL curriculum was incredible. The focus on performance optimization helped me design high-frame-rate UI elements that blew the interviewers away.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
  },
  {
    id: 'test-3',
    name: 'Neha Gupta',
    role: 'Cloud Architect',
    company: 'Amazon',
    rating: 5,
    quote: "Learning distributed systems in Rust from mentors who had actually built high-scale systems gave me depth that normal tutorials just don't offer. Highly recommended!",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-background border-t border-card-border/50 relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-2">Student Reviews</h3>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-heading mb-4">
            Loved by Thousands of Coders
          </h2>
          <p className="text-text-muted text-base md:text-lg">
            Hear from our alumni who transformed their careers and landed roles at top-tier software engineering teams worldwide.
          </p>
        </div>

        {/* Testimonials Marquee */}
        <div className="w-full overflow-hidden">
          <marquee behavior="scroll" direction="left" scrollamount="5" loop="-1" className="flex">
            <div className="flex gap-6 py-4 pr-6">
              {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, index) => (
                <div
                  key={`${t.id}-${index}`}
                  className="bg-card-bg border border-card-border p-6 rounded-3xl shadow-xs flex flex-col justify-between w-[340px] shrink-0 text-left"
                >
                  <div>
                    {/* Rating stars */}
                    <div className="flex gap-1 text-amber-500 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-xs text-text-muted leading-relaxed italic mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Student Bio */}
                  <div className="flex items-center gap-3 pt-4 border-t border-card-border/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-card-border"
                    />
                    <div>
                      <h4 className="font-heading font-extrabold text-foreground text-sm">{t.name}</h4>
                      <p className="text-[10px] text-text-muted font-semibold">
                        {t.role} &middot; <span className="text-primary">{t.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </marquee>
        </div>

      </div>
    </section>
  );
}
