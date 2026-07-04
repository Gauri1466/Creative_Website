'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RoadmapStep {
  title: string;
  desc: string;
}

interface RoadmapTrack {
  id: string;
  name: string;
  role: string;
  color: string;
  steps: RoadmapStep[];
}

const ROADMAPS: RoadmapTrack[] = [
  {
    id: 'track-1',
    name: 'Frontend Developer',
    role: 'UX & Client Architecture',
    color: 'bg-primary',
    steps: [
      { title: 'HTML, CSS & JS Fundamentals', desc: 'Master semantic web, grid layouts, and asynchronous programming.' },
      { title: 'React & TypeScript Mastery', desc: 'Dive into component life cycles, state machines, and type safety.' },
      { title: 'Next.js & Performance', desc: 'Server-side rendering, routing, static generation, and Core Web Vitals.' },
      { title: 'Animations & WebGL', desc: 'GSAP, ScrollTrigger, Framer Motion, and Three.js fundamentals.' },
    ],
  },
  {
    id: 'track-2',
    name: 'Backend Engineer',
    role: 'API & Core Systems',
    color: 'bg-accent',
    steps: [
      { title: 'Programming & Databases', desc: 'Learn Node/Rust/Go and relational vs NoSQL databases.' },
      { title: 'APIs & Microservices', desc: 'Build scalable RESTful, GraphQL, and gRPC service layers.' },
      { title: 'Message Brokers & Caching', desc: 'Implement Redis, RabbitMQ/Kafka, and session management.' },
      { title: 'System Deployments', desc: 'Docker containerization, Kubernetes, CI/CD, and serverless hosting.' },
    ],
  },
  {
    id: 'track-3',
    name: 'DSA Master',
    role: 'Algorithms & Complexity',
    color: 'bg-emerald-500',
    steps: [
      { title: 'Basics & Linear Structures', desc: 'Understand Big O notation, Arrays, Linked Lists, Stacks, and Queues.' },
      { title: 'Recursion & Sorting', desc: 'Master divide & conquer techniques, merge/quick sort, and backtracking.' },
      { title: 'Trees, Graphs & Heaps', desc: 'Traversals, BFS/DFS, Djikstra/Kruskal algorithms, and heap operations.' },
      { title: 'Dynamic Programming', desc: 'Solve advanced memoization and tabulation problems for interviews.' },
    ],
  },
];

export default function LearningRoadmaps() {
  const [activeTrack, setActiveTrack] = useState('track-1');

  const selectedTrack = ROADMAPS.find((r) => r.id === activeTrack) || ROADMAPS[0];

  return (
    <section className="py-20 bg-card-bg/40 border-t border-card-border/50 relative overflow-hidden">
      {/* Decorative Blur glows */}
      <div className="absolute left-1/3 top-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-2">Guided Learning</h3>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-heading mb-4">
            Personalized Learning Roadmaps
          </h2>
          <p className="text-text-muted text-base md:text-lg">
            Follow a structured learning path specifically built by top engineers to help you reach your career targets without getting lost.
          </p>
        </div>

        {/* Track Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {ROADMAPS.map((track) => (
            <button
              key={track.id}
              onClick={() => setActiveTrack(track.id)}
              className={`px-6 py-3.5 rounded-2xl text-xs font-bold cursor-pointer transition-all duration-300 ${
                activeTrack === track.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-card-bg border border-card-border text-text-muted hover:text-foreground'
              }`}
            >
              {track.name}
            </button>
          ))}
        </div>

        {/* Roadmap Roadmap Timeline Display */}
        <div className="max-w-4xl mx-auto relative pl-6 md:pl-0">
          
          {/* Vertical Connection Line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-0.5 bg-dashed border-l border-primary/20 -translate-x-1/2 pointer-events-none" />

          {/* Steps list */}
          <div className="space-y-12">
            {selectedTrack.steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center">
                  
                  {/* Central Node Circle */}
                  <div className="absolute left-[-15px] md:left-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center -translate-x-1/2 z-10 shadow-xs">
                    <span className="text-[10px] font-black text-primary">{idx + 1}</span>
                  </div>

                  {/* Left Column Content (or spacing on Desktop) */}
                  <div className={`w-full md:w-1/2 pr-0 md:pr-12 md:text-right ${isEven ? 'md:block' : 'md:opacity-0 md:pointer-events-none'}`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-card-bg border border-card-border p-6 rounded-3xl shadow-xs"
                      >
                        <h4 className="font-heading font-extrabold text-foreground text-sm mb-2">{step.title}</h4>
                        <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Spacer or spacing for alignment */}
                  <div className="w-full md:w-1/2 pl-8 md:pl-12 text-left md:block">
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-card-bg border border-card-border p-6 rounded-3xl shadow-xs"
                      >
                        <h4 className="font-heading font-extrabold text-foreground text-sm mb-2">{step.title}</h4>
                        <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
