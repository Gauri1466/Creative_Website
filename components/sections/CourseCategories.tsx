'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  category: 'Design' | 'Code';
  duration: string;
  lessons: number;
  level: string;
  price: string;
  students: string;
  image: string;
  mentors: string[];
}

const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Web Design & Development',
    category: 'Design',
    duration: '12h',
    lessons: 24,
    level: 'Beginner',
    price: '$203.00',
    students: '2k+',
    image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=600&auto=format&fit=crop',
    mentors: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop'],
  },
  {
    id: 'course-2',
    title: 'Python for Data Science',
    category: 'Code',
    duration: '20h',
    lessons: 32,
    level: 'Beginner',
    price: '$203.00',
    students: '3k+',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
    mentors: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=100&auto=format&fit=crop'],
  },
  {
    id: 'course-3',
    title: 'Wireframing & Prototyping',
    category: 'Design',
    duration: '18h',
    lessons: 28,
    level: 'Beginner',
    price: '$203.00',
    students: '1.5k+',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop',
    mentors: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop'],
  },
];

export default function CourseCategories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Design' | 'Code'>('All');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="courses" className="py-20 bg-background relative border-t border-card-border/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Search Bar Block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-heading mb-6">
            Search Courses
          </h2>
          <div className="relative flex items-center bg-card-bg border border-card-border rounded-full p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
            <div className="pl-4 text-text-muted">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for over 100+ courses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-hidden px-3 text-foreground placeholder-text-muted/70 text-sm md:text-base"
            />
            <button className="btn-3d-primary btn-shine text-xs md:text-sm px-6 py-2.5 shadow-xs">
              Search
            </button>
          </div>
        </div>

        {/* Category Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-card-border/30 pb-6 gap-6">
          <div>
            <h3 className="text-xs font-bold tracking-widest text-primary uppercase mb-2">Popular Catalog</h3>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-heading">
              Our Popular Courses
            </h2>
          </div>
          
          <div className="flex gap-2 bg-card-bg border border-card-border p-1 rounded-full w-fit">
            {(['All', 'Design', 'Code'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold cursor-pointer transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                layout
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col bg-card-bg border border-card-border rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                {/* Course Image Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-accent-light/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Badge & Duration */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-extrabold px-3 py-1 rounded-full uppercase bg-primary text-white tracking-widest shadow-sm">
                      {course.category}
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-slate-900/80 text-white flex items-center gap-1 backdrop-blur-xs">
                      <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Lessons & Level */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                        {course.lessons} Lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        {course.level}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold font-heading text-foreground mb-4 line-clamp-1 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                  </div>

                  {/* Pricing, Mentor Avatars & Student Count */}
                  <div className="pt-5 border-t border-card-border/30 flex items-center justify-between">
                    <div>
                      <p className="text-xl font-extrabold text-foreground tracking-tight">{course.price}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Avatars stacked */}
                      <div className="flex -space-x-2">
                        {course.mentors.map((avatar, i) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={i}
                            src={avatar}
                            alt="Mentor avatar"
                            className="w-7 h-7 rounded-full border border-card-bg object-cover"
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-text-muted">
                        {course.students}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Dots Indicator */}
        <div className="flex justify-center items-center gap-2.5 mt-12">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentPage === i ? 'bg-primary w-6' : 'bg-card-border hover:bg-text-muted/40'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
