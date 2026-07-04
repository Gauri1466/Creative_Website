'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SkillCard {
  id: string;
  title: string;
  desc: string;
  iconBg: string;
  iconText: string;
  topics: string[];
}

const SKILLS: SkillCard[] = [
  {
    id: 'skill-1',
    title: 'Data Structures & Algorithms',
    desc: 'Build a rock-solid foundation for coding interviews at tier-1 product companies.',
    iconBg: 'bg-primary/10 text-primary',
    iconText: 'DSA',
    topics: ['Arrays & Hashmaps', 'Recursion & Backtracking', 'Trees & Graph Theory', 'Dynamic Programming'],
  },
  {
    id: 'skill-2',
    title: 'System Design (HLD & LLD)',
    desc: 'Learn to architect scalable systems handling millions of requests per second.',
    iconBg: 'bg-accent/10 text-accent',
    iconText: 'SYS',
    topics: ['Load Balancers & Caching', 'Database Sharding', 'Message Queues', 'Object Oriented Patterns'],
  },
  {
    id: 'skill-3',
    title: 'Full Stack Development',
    desc: 'Master frontend animations and server systems to build real world products.',
    iconBg: 'bg-emerald-500/10 text-emerald-600',
    iconText: 'DEV',
    topics: ['Next.js App Router', 'RESTful & GraphQL APIs', 'SQL & NoSQL Databases', 'WebGL & GSAP Animations'],
  },
  {
    id: 'skill-4',
    title: 'Cloud & DevOps',
    desc: 'Understand containerization and deployment pipelines for reliable hosting.',
    iconBg: 'bg-amber-500/10 text-amber-600',
    iconText: 'OPS',
    topics: ['Docker Containerization', 'Kubernetes Clusters', 'CI/CD Pipelines', 'AWS / GCP Solutions'],
  },
];

export default function TechnicalSkills() {
  return (
    <section className="py-20 bg-background border-t border-card-border/50 relative">
      <div className="absolute bottom-12 right-0 w-[200px] h-[200px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-2">Build Competency</h3>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-heading mb-4">
            Master Core Technical Skills
          </h2>
          <p className="text-text-muted text-base md:text-lg">
            Our comprehensive curriculum covers the absolute core competencies required to succeed in modern engineering roles.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-card-bg border border-card-border p-8 rounded-3xl shadow-xs hover:border-primary/20 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Badge Icon */}
              <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center font-heading font-black text-sm tracking-wide ${skill.iconBg}`}>
                {skill.iconText}
              </div>

              {/* Contents */}
              <div className="flex-1">
                <h3 className="text-lg font-bold font-heading text-foreground mb-3">{skill.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed mb-6">{skill.desc}</p>
                
                {/* Topics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skill.topics.map((topic) => (
                    <div key={topic} className="flex items-center gap-2 text-xs font-medium text-text-muted">
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
