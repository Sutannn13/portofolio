'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StringLine from './StringLine';
import Copy from './Copy';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AWARDS = [
  {
    title: 'Honorable Mention',
    meta: '2026 - AWWARDS',
    imgSrc: '/portfolio-img-1.webp',
  },
  {
    title: 'Site of the Day',
    meta: '2026 - AWWARDS',
    imgSrc: '/portfolio-img-2.webp',
  },
  {
    title: 'The Webby Awards',
    meta: '2026 - OFFICIAL SELECTION',
    imgSrc: '/portfolio-img-3.webp',
  },
  {
    title: 'FWA',
    meta: '2026 - FWA OF THE DAY',
    imgSrc: '/portfolio-img-4.webp',
  },
];

export default function Awards() {
  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineDividersRef = useRef<(HTMLDivElement | null)[]>([]);
  const zCounter = useRef(AWARDS.length);
  const reducedMotion = useRef(false);
  const activeHoverIndex = useRef<number | null>(null);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (imageBoxRef.current) gsap.set(imageBoxRef.current, { y: 0 });
    if (imageContainerRef.current) gsap.set(imageContainerRef.current, { opacity: 0 });
    imagesRef.current.forEach((img, idx) => {
      if (!img) return;
      gsap.set(img, { zIndex: idx + 1 });
      if (idx === 0) {
        gsap.set(img, { scale: 1.05 });
      } else {
        gsap.set(img, { scale: 0 });
      }
    });
  }, []);

  useEffect(() => {
    const validLines = lineDividersRef.current.filter(Boolean) as HTMLElement[];
    gsap.set(validLines, { scaleX: 1, transformOrigin: 'left center' });

    if (reducedMotion.current) return;

    const st = ScrollTrigger.create({
      trigger: '#awards',
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          validLines,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out' }
        );
      },
    });

    return () => {
      st.kill();
      gsap.set(validLines, { scaleX: 1 });
    };
  }, []);

  const activateRow = useCallback((idx: number) => {
    const rowEl = rowsRef.current[idx];
    const boxEl = imageBoxRef.current;
    if (rowEl && boxEl) {
      const curY = Number(gsap.getProperty(boxEl, 'y')) || 0;
      const boxRect = boxEl.getBoundingClientRect();
      const originY = boxRect.top + boxRect.height / 2 - curY;
      const rowRect = rowEl.getBoundingClientRect();
      const targetY = rowRect.top + rowRect.height / 2 - originY;

      if (reducedMotion.current) {
        gsap.set(boxEl, { y: targetY });
      } else {
        gsap.to(boxEl, {
          y: targetY,
          duration: 0.65,
          ease: 'back.out(1.6)',
        });
      }
    }

    const imgEl = imagesRef.current[idx];
    if (imgEl) {
      zCounter.current += 1;
      gsap.set(imgEl, { zIndex: zCounter.current });
      gsap.killTweensOf(imgEl);
      if (reducedMotion.current) {
        gsap.set(imgEl, { scale: 1.05 });
      } else {
        gsap.set(imgEl, { scale: 0 });
        gsap.to(imgEl, {
          scale: 1.05,
          duration: 0.45,
          ease: 'power2.out',
        });
      }
    }
  }, []);

  const checkHoverRow = useCallback(
    (clientX: number, clientY: number) => {
      const rows = rowsRef.current;
      let hoveredIdx: number | null = null;
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i]?.getBoundingClientRect();
        if (r && clientY >= r.top && clientY < r.bottom && clientX >= r.left && clientX < r.right) {
          hoveredIdx = i;
          break;
        }
      }
      if (hoveredIdx !== null && hoveredIdx !== activeHoverIndex.current) {
        activeHoverIndex.current = hoveredIdx;
        activateRow(hoveredIdx);
      }
    },
    [activateRow]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      checkHoverRow(e.clientX, e.clientY);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [checkHoverRow]);

  useEffect(() => {
    const onScroll = () => {
      if (lastMousePos.current) {
        checkHoverRow(lastMousePos.current.x, lastMousePos.current.y);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [checkHoverRow]);

  return (
    <section className="relative w-screen bg-[#070707] text-white py-[7vw]" id="awards">
      <div className="w-screen flex items-center px-[4vw] gap-[4vw] max-[1025px]:px-[5vw]">
        <div className="w-full">
          <Copy stagger={0.015}>
            <h2 className="text-[5.5vw] leading-[1.2] mb-[4vw] max-[1025px]:text-[7vw] max-md:text-[9vw]">
              Awards and Industry
              <br />
              Recognition
            </h2>
          </Copy>

          <div
            onMouseEnter={() => {
              if (imageContainerRef.current) {
                gsap.to(imageContainerRef.current, {
                  opacity: 1,
                  duration: reducedMotion.current ? 0 : 0.4,
                  ease: 'power2.out',
                });
              }
            }}
            onMouseLeave={() => {
              activeHoverIndex.current = null;
              if (imageContainerRef.current) {
                gsap.to(imageContainerRef.current, {
                  opacity: 0,
                  duration: reducedMotion.current ? 0 : 0.4,
                  ease: 'power2.out',
                });
              }
            }}
          >
            {/* Top string line above first award */}
            <div
              ref={(el) => {
                lineDividersRef.current[0] = el;
              }}
              className="relative h-px w-full origin-left z-10"
            >
              <StringLine strokeColor="rgba(255, 255, 255, 0.45)" strokeWidth={1} />
            </div>

            {AWARDS.map((award, i) => (
              <React.Fragment key={award.title}>
                <div
                  ref={(el) => {
                    rowsRef.current[i] = el;
                  }}
                  className="flex items-center justify-between py-[3vw] cursor-pointer group max-[1025px]:py-[4vw] max-md:py-[6vw]"
                >
                  <span className="text-[3vw] font-normal group-hover:text-[#ff6b00] transition-colors max-[1025px]:text-[4.5vw] max-md:text-[6vw]">
                    {award.title}
                  </span>
                  <span className="text-[1.25vw] text-white/50 group-hover:text-white transition-colors max-[1025px]:text-[2.2vw] max-md:text-[3.5vw]">
                    {award.meta}
                  </span>
                </div>

                {/* Divider below each award row */}
                <div
                  ref={(el) => {
                    lineDividersRef.current[i + 1] = el;
                  }}
                  className="relative h-px w-full origin-left z-10"
                >
                  <StringLine strokeColor="rgba(255, 255, 255, 0.45)" strokeWidth={1} />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div
          ref={imageContainerRef}
          className="image-container w-[35vw] h-[22vw] fixed right-[6vw] top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden rounded-2xl z-20 opacity-0 max-[1025px]:hidden"
        >
          <div ref={imageBoxRef} className="relative w-full h-full">
            {AWARDS.map((award, idx) => (
              <div
                key={award.title}
                ref={(el) => {
                  imagesRef.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full origin-center"
              >
                <Image
                  src={award.imgSrc}
                  width={1440}
                  height={900}
                  alt={award.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
