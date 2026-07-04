'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TrustedCompanies() {
  const companies = [
    {
      name: 'GitHub',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
    },
    {
      name: 'Coursera',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm1.07-5.75l-.9.92c-.72.73-1.17 1.33-1.17 2.33h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.6-.86.6-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
        </svg>
      ),
      customText: true,
    },
    {
      name: 'Microsoft',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 23 23">
          <path fill="#f25022" d="M0 0h11v11H0z" />
          <path fill="#7fba00" d="M12 0h11v11H12z" />
          <path fill="#00a4ef" d="M0 12h11v11H0z" />
          <path fill="#ffb900" d="M12 12h11v11H12z" />
        </svg>
      ),
    },
    {
      name: 'Apple',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94.1.08.2.12.3.12.87 0 1.95-.57 2.51-1.45z" />
        </svg>
      ),
    },
    {
      name: 'Google',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-primary py-8 overflow-hidden relative z-20 border-y border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        <span className="text-white/70 font-heading text-xs font-bold uppercase tracking-widest text-center md:text-left flex-shrink-0">
          Trusted by employees of
        </span>
        
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 md:gap-12 w-full text-white">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.08 }}
              className="flex items-center gap-2.5 cursor-pointer opacity-85 hover:opacity-100 transition-opacity"
            >
              {company.icon}
              {company.name === 'Coursera' ? (
                <span className="font-heading font-extrabold text-sm tracking-tight text-white">
                  coursera
                </span>
              ) : (
                <span className="font-heading font-bold text-sm tracking-wide text-white">
                  {company.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
