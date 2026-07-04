'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Mentors() {
  const benefits = [
    {
      title: 'Flexibility',
      desc: 'Learn at your own pace, anytime and anywhere, without disrupting your schedule.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Expert Instructors',
      desc: 'Gain knowledge from industry professionals with real-world experience.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      title: 'Career Growth',
      desc: 'Develop in-demand skills, earn certificates, and enhance your career with confidence.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 bg-card-bg/40 border-t border-card-border/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Column: standing 3D boy illustration */}
        <div className="lg:col-span-6 flex justify-center items-center select-none">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="relative w-full max-w-[420px] aspect-square flex items-center justify-center drop-shadow-[0_12px_24px_rgba(108,43,211,0.15)]"
          >
            <Image
              src="/assets/boy-laptop-transparent.png"
              alt="Standing Boy with Laptop Illustration"
              fill
              priority
              className="object-contain"
            />
          </motion.div>
        </div>

        {/* Right Column: Benefits details */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-heading leading-tight mb-4">
              <span className="text-primary">Benefits</span> from our online learning
            </h2>
          </motion.div>

          <div className="space-y-6 w-full">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 items-start"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0 shadow-xs">
                  {benefit.icon}
                </div>
                
                {/* Description */}
                <div>
                  <h4 className="font-heading font-extrabold text-foreground text-base mb-1.5">{benefit.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed max-w-lg">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
