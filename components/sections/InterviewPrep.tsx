'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PrepKit {
  id: string;
  company: string;
  problemsCount: number;
  placedCount: string;
  accentBg: string;
  iconBg: string;
  difficultyFocus: string;
}

const PREP_KITS: PrepKit[] = [
  {
    id: 'prep-1',
    company: 'Google',
    problemsCount: 150,
    placedCount: '250+ students placed',
    accentBg: 'hover:border-red-500/30',
    iconBg: 'bg-red-500/10 text-red-500',
    difficultyFocus: 'Hard DSA & System Design',
  },
  {
    id: 'prep-2',
    company: 'Amazon',
    problemsCount: 180,
    placedCount: '340+ students placed',
    accentBg: 'hover:border-orange-500/30',
    iconBg: 'bg-orange-500/10 text-orange-500',
    difficultyFocus: 'Graphs, Trees & LLD',
  },
  {
    id: 'prep-3',
    company: 'Microsoft',
    problemsCount: 160,
    placedCount: '290+ students placed',
    accentBg: 'hover:border-blue-500/30',
    iconBg: 'bg-blue-500/10 text-blue-500',
    difficultyFocus: 'Strings, Arrays & Threading',
  },
  {
    id: 'prep-4',
    company: 'Netflix',
    problemsCount: 120,
    placedCount: '90+ students placed',
    accentBg: 'hover:border-purple-600/30',
    iconBg: 'bg-purple-600/10 text-purple-500',
    difficultyFocus: 'High-scale System Architectures',
  },
];

export default function InterviewPrep() {
  return (
    <section className="py-20 bg-background border-t border-card-border/50 relative">
      <div className="absolute top-1/2 left-0 w-[200px] h-[200px] bg-primary/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-2">Crack Interviews</h3>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-heading mb-4">
            Company-Specific Interview Prep
          </h2>
          <p className="text-text-muted text-base md:text-lg">
            Target your preparation with curated practice lists modeled directly after actual interview patterns of leading product companies.
          </p>
        </div>

        {/* Prep Kits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PREP_KITS.map((kit, index) => (
            <motion.div
              key={kit.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className={`bg-card-bg border border-card-border p-6 rounded-3xl transition-all duration-300 ${kit.accentBg} shadow-xs flex flex-col justify-between h-full`}
            >
              <div>
                {/* Icon & Name */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-base ${kit.iconBg}`}>
                    {kit.company[0]}
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-foreground text-base">{kit.company} Prep</h4>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Interview Kit</p>
                  </div>
                </div>

                {/* Problems count & details */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-muted">Total Problems</span>
                    <span className="font-extrabold text-foreground">{kit.problemsCount} Qs</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-muted">Focus Areas</span>
                    <span className="font-semibold text-primary text-[10px] text-right max-w-[150px] truncate">
                      {kit.difficultyFocus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Alumni Placement Stats & Explore CTA */}
              <div className="pt-4 border-t border-card-border/30">
                <p className="text-[10px] font-bold text-accent mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {kit.placedCount}
                </p>
                
                <a
                  href={`#prep-${kit.id}`}
                  className="w-full inline-flex h-9 items-center justify-center rounded-xl bg-card-bg border border-card-border hover:border-primary/40 hover:text-primary text-foreground text-xs font-bold transition-colors cursor-pointer"
                >
                  Start Preparing
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
