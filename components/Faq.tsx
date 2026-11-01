'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Copy from './Copy';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FAQS = [
  {
    question: 'Who is Johann and what kind of projects do you take?',
    answer:
      'I am an independent digital designer who helps businesses create, launch, and optimize digital experiences seamlessly. I specialize in responsive web design, modern UX principles, and conversion-driven visual strategies while ensuring accessibility, performance, and refined aesthetics.',
  },
  {
    question: 'How quickly can you deliver a complete website for my business?',
    answer:
      'Most projects launch in as little as 48 hours for smaller sites, with larger multi-page builds typically wrapping within two to three weeks depending on scope, content readiness, and how many revision rounds are needed.',
  },
  {
    question: 'Do you work with existing design systems and content management platforms?',
    answer:
      'Yes - I regularly work inside established design systems and popular CMS platforms alike, adapting to whatever your team already has in place rather than forcing a rebuild from scratch.',
  },
  {
    question: 'What design standards do you follow consistently?',
    answer:
      'Every project follows WCAG accessibility guidelines, semantic markup, and performance budgets from day one, alongside a consistent typographic and spacing system so the final product feels cohesive across every screen.',
  },
  {
    question: 'How do you stay current with emerging design trends and innovations each year?',
    answer:
      'I dedicate time each month to hands-on experimentation with new interaction patterns, tooling, and frameworks, plus regular study of award-winning work, so the craft behind every project keeps pace with where the web is heading.',
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number>(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heightRefs = useRef<number[]>([0, 0, 0, 0, 0]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const validRows = rowRefs.current.filter(Boolean) as HTMLElement[];
    if (reducedMotion) {
      gsap.set(validRows, { opacity: 1, y: 0 });
      return;
    }

    const tweens = validRows.map((row) =>
      gsap.fromTo(
        row,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    );

    return () => {
      tweens.forEach((t) => t.scrollTrigger?.kill());
      tweens.forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  const toggleAccordion = (idx: number) => {
    const el = contentRefs.current[idx];
    if (!el) return;

    const isOpening = openIdx !== idx;
    const dur = reducedMotion ? 0 : 0.45;

    // Close previous if any
    if (openIdx !== -1 && openIdx !== idx) {
      const prevEl = contentRefs.current[openIdx];
      if (prevEl) {
        gsap.killTweensOf(prevEl);
        gsap.set(prevEl, { overflow: 'hidden' });
        gsap.fromTo(
          prevEl,
          { height: heightRefs.current[openIdx] || prevEl.scrollHeight },
          { height: 0, duration: dur, ease: 'power3.out' }
        );
      }
    }

    // Toggle target
    gsap.killTweensOf(el);
    if (isOpening) {
      gsap.set(el, { overflow: 'hidden', height: 'auto' });
      const fullH = el.scrollHeight;
      heightRefs.current[idx] = fullH;
      gsap.set(el, { height: 0 });
      gsap.fromTo(
        el,
        { height: 0 },
        {
          height: fullH,
          duration: dur,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(el, { height: 'auto', overflow: 'visible' });
          },
        }
      );
      setOpenIdx(idx);
    } else {
      gsap.set(el, { overflow: 'hidden' });
      gsap.fromTo(
        el,
        { height: heightRefs.current[idx] || el.scrollHeight },
        {
          height: 0,
          duration: dur,
          ease: 'power3.out',
        }
      );
      setOpenIdx(-1);
    }
  };

  return (
    <section className="w-screen py-[6vw] px-[10vw] relative bg-[#070707] text-white max-[1025px]:px-[5vw]">
      <Copy stagger={0.015}>
        <h2 className="text-[5.5vw] text-center mb-[6vw] max-[1025px]:text-[7vw] max-md:text-[9vw]">
          Frequently Asked Questions
        </h2>
      </Copy>

      <div className="w-full mx-auto">
        {FAQS.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={faq.question}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="opacity-0"
            >
              <div className="border-b border-white/10 py-8 group max-md:py-5">
                <button
                  type="button"
                  onClick={() => toggleAccordion(i)}
                  aria-expanded={isOpen}
                  className="flex items-center justify-between gap-6 w-full text-left cursor-pointer max-md:gap-4"
                >
                  <span className="text-[1.5vw] font-normal max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]">
                    {faq.question}
                  </span>
                  <div className="relative shrink-0 size-14 rounded-full overflow-hidden flex items-center justify-center transition-colors duration-300 ease-out border border-white/20 max-[1025px]:size-11 max-md:size-9">
                    <span className="absolute h-[2px] z-2 w-4 rounded-full bg-white max-md:w-3" />
                    <span
                      className={`absolute h-[2px] z-2 w-4 rounded-full bg-white transition-transform duration-300 ease-out max-md:w-3 ${
                        isOpen ? 'rotate-0' : 'rotate-90'
                      }`}
                    />
                    <div
                      className={`absolute inset-0 w-full h-full bg-linear-to-r from-[#F16B0D] to-[#E61416] group-hover:scale-100 ease-in-out origin-center rounded-full duration-300 ${
                        isOpen ? 'scale-100' : 'scale-0'
                      }`}
                    />
                  </div>
                </button>

                <div
                  ref={(el) => {
                    contentRefs.current[i] = el;
                  }}
                  style={{
                    height: i === 0 ? 'auto' : 0,
                    overflow: i === 0 ? 'visible' : 'hidden',
                  }}
                  className="transition-none"
                >
                  <div className="pt-4 text-white/70 text-[1.15vw] leading-[1.6] w-[80%] max-[1025px]:text-[2.2vw] max-[1025px]:w-full max-md:text-[3.5vw]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
