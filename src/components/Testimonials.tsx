'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import Copy from './Copy';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS = [
  {
    name: 'Maria Jones',
    role: 'Creative Director at StudioForm',
    quote:
      'Elena transformed our vision into an incredible, responsive digital product. The attention to interactive detail and typography elevated the entire user journey beyond what we envisioned.',
    image: '/testimonial-1.webp',
  },
  {
    name: 'Marcus Reed',
    role: 'Head of Product at Nexus Media',
    quote:
      'Working alongside Elena was effortless. Rapid turnarounds, clean modular components, and an extraordinary aesthetic touch that immediately improved our conversion metrics.',
    image: '/testimonial-5.webp',
  },
  {
    name: 'Priya Nair',
    role: 'Founder at Aurelius Studio',
    quote:
      'From custom micro-interactions to rock-solid design architecture, Elena delivered an award-grade experience. Our customers consistently comment on the premium look and feel.',
    image: '/testimonial-3.webp',
  },
  {
    name: 'Daniel Ortiz',
    role: 'VP of Design at CraftVentures',
    quote:
      'Elena has that rare ability to bridge creative design thinking with technical performance. Clean typography, tight layouts, and exceptional visual rhythm across every viewport.',
    image: '/testimonial-4.webp',
  },
  {
    name: 'Hannah Kim',
    role: 'Digital Strategist at Vanguard Labs',
    quote:
      'The speed and precision was unbelievable. She turned an abstract brand concept into an unforgettable interactive site in under two weeks without compromising quality.',
    image: '/testimonial-2.webp',
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = gsap.utils.toArray('.testimonial-fade') as HTMLElement[];
    if (reduced) {
      gsap.set(elements, { opacity: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const nextTestimonial = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % count);
  }, [count]);

  const prevTestimonial = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + count) % count);
  }, [count]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="w-screen bg-[#070707] py-[7vw] px-[4vw] max-[1025px]:px-[5vw] max-[1025px]:py-[12vw]"
    >
      <div className="w-full flex flex-col gap-[6vw] max-[1025px]:gap-[12vw]">
        <div className="w-[65%] mx-auto max-[1025px]:w-full">
          <Copy stagger={0.015}>
            <h2 className="text-[5.2vw] leading-[1.2]! text-center max-[1025px]:text-[7vw] max-md:text-[9vw]">
              Don't Take It from Us, Take It from Our Clients
            </h2>
          </Copy>
        </div>

        <div className="relative max-md:mt-10">
          <div className="testimonial-fade opacity-0 relative w-3/5 mx-auto rounded-[2vw] border border-white/10 bg-white/5 overflow-hidden max-[1025px]:w-full max-[1025px]:rounded-[5vw] h-[30vw] max-[1025px]:h-[52vw] max-md:h-[95vw]">
            <AnimatePresence mode="wait">
              <motion.div
                key={TESTIMONIALS[activeIdx].name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 100) prevTestimonial();
                  else if (info.offset.x < -100) nextTestimonial();
                }}
                className="pt-[8vw] pb-[4vw] px-[6vw] w-full h-full flex flex-col items-center justify-center gap-[2.5vw] text-center max-[1025px]:pt-[14vw] max-[1025px]:px-[8vw] max-[1025px]:gap-[4vw] max-md:pt-[22vw] max-md:px-[7vw] max-md:pb-[8vw] max-md:gap-[6vw]"
              >
                <div className="flex flex-col gap-[0.4vw] max-md:gap-2">
                  <p className="text-[2.6vw] text-[#ff6b00] max-[1025px]:text-[4vw] max-md:text-[6vw]">
                    {TESTIMONIALS[activeIdx].name}
                  </p>
                  <p className="text-[1.145vw] text-white max-[1025px]:text-[2.2vw] max-md:text-[3.6vw]">
                    {TESTIMONIALS[activeIdx].role}
                  </p>
                </div>
                <p className="text-[1.145vw] leading-[1.6] text-white/70 w-[82%] max-[1025px]:text-[2.2vw] max-[1025px]:w-full max-md:text-[3.6vw]">
                  “{TESTIMONIALS[activeIdx].quote}”
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="testimonial-fade opacity-0 flex w-full justify-center items-center absolute -top-[2vw] left-1/2 -translate-x-1/2 max-md:-top-[6vw]">
            {TESTIMONIALS.map((t, idx) => {
              const half = Math.floor(count / 2);
              const rawDiff = (idx - activeIdx + count) % count;
              const order = rawDiff <= half ? rawDiff : rawDiff - count;
              const isCenter = order === 0;

              return (
                <motion.button
                  key={t.name}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`Show testimonial from ${t.name}`}
                  aria-current={isCenter}
                  layout
                  animate={{ scale: isCenter ? 1.6 : 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    order,
                    zIndex: isCenter ? 10 : count - Math.abs(order),
                  }}
                  className={`w-[5vw] h-[5vw] rounded-full overflow-hidden [clip-path:circle(50%)] cursor-pointer max-[1025px]:w-[9vw] max-[1025px]:h-[9vw] max-md:w-[12vw] max-md:h-[12vw] ${
                    isCenter
                      ? 'bg-linear-to-r from-[#F16B0D] to-[#E61416] p-[0.3vw] mx-[2vw] max-md:mx-[4vw]'
                      : `opacity-60 hover:opacity-100 ${
                          order < 0 ? '-mr-[1vw]' : '-ml-[1vw]'
                        }`
                  }`}
                >
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </motion.button>
              );
            })}
          </div>

          <div className="testimonial-fade opacity-0 flex justify-center gap-3 mt-[3vw] max-md:mt-[8vw]">
            <button
              type="button"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="size-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer relative group overflow-hidden max-md:size-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="size-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer relative group overflow-hidden max-md:size-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
