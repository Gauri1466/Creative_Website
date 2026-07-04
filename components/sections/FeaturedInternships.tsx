'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Internship {
  id: string;
  company: string;
  logoBg: string;
  role: string;
  duration: string;
  stipend: string;
  location: string;
  skills: string[];
}

const INTERNSHIPS: Internship[] = [
  {
    id: 'intern-1',
    company: 'Google',
    logoBg: 'bg-red-500/10 text-red-500',
    role: 'Software Engineering Intern',
    duration: '3 Months',
    stipend: '$1,500 / month',
    location: 'Remote / Bangalore',
    skills: ['C++', 'Python', 'Data Structures'],
  },
  {
    id: 'intern-2',
    company: 'Meta',
    logoBg: 'bg-blue-600/10 text-blue-600',
    role: 'Frontend Engineering Intern',
    duration: '6 Months',
    stipend: '$1,800 / month',
    location: 'Hybrid / London',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'intern-3',
    company: 'Amazon',
    logoBg: 'bg-orange-500/10 text-orange-500',
    role: 'Cloud Engineering Intern',
    duration: '6 Months',
    stipend: '$1,400 / month',
    location: 'Remote',
    skills: ['AWS', 'Node.js', 'System Design'],
  },
];

export default function FeaturedInternships() {
  return (
    <section className="py-20 bg-card-bg/40 border-t border-card-border/50 relative overflow-hidden">
      {/* Decorative Blur glows */}
      <div className="absolute right-0 bottom-0 w-[250px] h-[250px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-2">Build Experience</h3>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-heading mb-4">
            Featured Internships
          </h2>
          <p className="text-text-muted text-base md:text-lg">
            Apply to premium, hand-picked internships at leading tech companies. Gain real-world engineering experience and transition into full-time roles.
          </p>
        </div>

        {/* Internship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INTERNSHIPS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex flex-col justify-between bg-card-bg border border-card-border p-6 rounded-3xl shadow-xs hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <div>
                {/* Header: Company & Duration */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm uppercase ${item.logoBg}`}>
                      {item.company[0]}
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-foreground text-sm">{item.company}</h4>
                      <p className="text-[10px] text-text-muted font-medium">{item.location}</p>
                    </div>
                  </div>
                  
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent-light dark:bg-card-bg/60 text-primary border border-primary/10">
                    {item.duration}
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="text-lg font-bold font-heading text-foreground mb-4 group-hover:text-primary">
                  {item.role}
                </h3>

                {/* Requirements / Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-card-bg border border-card-border text-text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer: Stipend & Apply Action */}
              <div className="pt-4 border-t border-card-border/30 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Stipend</p>
                  <p className="font-heading font-extrabold text-foreground text-sm">{item.stipend}</p>
                </div>
                
                <a
                  href={`#apply-${item.id}`}
                  className="inline-flex h-9 items-center justify-center rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 transition-colors shadow-xs cursor-pointer"
                >
                  Apply Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
