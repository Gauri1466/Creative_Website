'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', question: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.question) {
      setIsSubmitted(true);
      // Reset form after submission
      setTimeout(() => {
        setFormData({ name: '', email: '', question: '' });
      }, 500);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-radial-vignette relative border-t border-card-border/50 overflow-hidden">
      
      {/* Decorative Blur Bubble */}
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-10 w-[250px] h-[250px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3.5 py-1.5 rounded-full bg-accent-light dark:bg-card-bg/50 border border-primary/20 text-xs font-extrabold tracking-wider text-primary uppercase mb-4"
          >
            📬 Have Questions?
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-foreground font-heading mb-4"
          >
            Drop Us a Line
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-muted text-base max-w-md mx-auto"
          >
            Have a question about our courses or features? Send us a message and we'll lock in an answer for you.
          </motion.p>
        </div>

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-card-bg/60 border border-card-border/80 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-foreground/80">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Arjun"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background/50 border border-card-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-2xl px-4 py-3.5 text-sm text-foreground placeholder-text-muted/50 outline-hidden transition-all duration-300 shadow-inner"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-foreground/80">
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="arjun@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background/50 border border-card-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-2xl px-4 py-3.5 text-sm text-foreground placeholder-text-muted/50 outline-hidden transition-all duration-300 shadow-inner"
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-question" className="text-xs font-bold uppercase tracking-wider text-foreground/80">
                    What's your question?
                  </label>
                  <textarea
                    id="contact-question"
                    required
                    rows={4}
                    placeholder="Ask us anything about our programs..."
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full bg-background/50 border border-card-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-2xl px-4 py-3.5 text-sm text-foreground placeholder-text-muted/50 outline-hidden transition-all duration-300 resize-none shadow-inner"
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="btn-3d-primary btn-shine w-full sm:w-auto px-10 py-4 text-base tracking-wide"
                  >
                    Send Question
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 border border-emerald-500/30">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-foreground mb-3 font-heading">
                  Message Sent Successfully!
                </h3>
                <p className="text-text-muted text-sm max-w-sm mb-8 leading-relaxed">
                  Thanks for reaching out, {formData.name}! We've received your question and will get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-3d-secondary px-8 py-3 text-sm"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
