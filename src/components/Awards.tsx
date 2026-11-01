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

interface AwardItem {
  title: string;
  meta: string;
  imgSrc: string;
  fit?: 'cover' | 'contain';
}

const AWARDS: AwardItem[] = [
  {
    title: 'Full-Stack Engineer Intern',
    meta: 'FEB 2026 - PRESENT - CONNEXTION TECH (LETS AFK)',
    imgSrc: '/experiences/lets-afk.png',
    fit: 'cover',
  },
  {
    title: 'IT Support & Systems Intern',
    meta: '3 MONTHS INTERNSHIP - KEMENAG KOTA DEPOK (GDC)',
    imgSrc: '/experiences/kemenag-depok-official.png',
    fit: 'cover',
  },
  {
    title: 'Lead Developer & Project Manager',
    meta: 'JUN 2025 - JUL 2025 - IT BOOTCAMP (TRASH POINT)',
    imgSrc: '/experiences/it-bootcamp-trashpoint.jpg',
    fit: 'cover',
  },
  {
    title: 'Researcher & Application Developer',
    meta: 'AUG 2025 - SEPT 2025 - UBSI (SALI: SADAR & LINDUNGI)',
    imgSrc: '/experiences/sali-sadar-lindungi.png',
    fit: 'cover',
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
    if (imageContainerRef.current) gsap.set(imageContainerRef.current, { opacity: 0, y: 0 });
    imagesRef.current.forEach((img, idx) => {
      if (!img) return;
      gsap.set(img, { zIndex: idx + 1, opacity: idx === 0 ? 1 : 0 });
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
    activeHoverIndex.current = idx;
    const rowEl = rowsRef.current[idx];
    const containerEl = imageContainerRef.current;
    if (rowEl && containerEl) {
      const rowRect = rowEl.getBoundingClientRect();
      const targetY = rowRect.top + rowRect.height / 2 - window.innerHeight / 2;

      if (reducedMotion.current) {
        gsap.set(containerEl, { y: targetY });
      } else {
        gsap.to(containerEl, {
          y: targetY,
          duration: 0.45,
          ease: 'power3.out',
        });
      }
    }

    imagesRef.current.forEach((imgEl, i) => {
      if (!imgEl) return;
      if (i === idx) {
        zCounter.current += 1;
        gsap.set(imgEl, { zIndex: zCounter.current });
        gsap.killTweensOf(imgEl);
        if (reducedMotion.current) {
          gsap.set(imgEl, { opacity: 1, scale: 1 });
        } else {
          gsap.fromTo(
            imgEl,
            { opacity: 0, scale: 0.96 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.35,
              ease: 'power2.out',
            }
          );
        }
      } else {
        gsap.killTweensOf(imgEl);
        gsap.to(imgEl, {
          opacity: 0,
          duration: 0.2,
          ease: 'power1.out',
        });
      }
    });
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
            <h2 className="text-[5.5vw] leading-[1.2] mb-[4vw] max-[1025px]:text-[6.5vw] max-md:text-[7.2vw] max-md:mb-8">
              Work Experience &amp;
              <br />
              Professional Journey
            </h2>
          </Copy>

          <div
            onMouseEnter={() => {
              if (imageContainerRef.current) {
                gsap.to(imageContainerRef.current, {
                  opacity: 1,
                  duration: reducedMotion.current ? 0 : 0.3,
                  ease: 'power2.out',
                });
              }
            }}
            onMouseLeave={() => {
              activeHoverIndex.current = null;
              if (imageContainerRef.current) {
                gsap.to(imageContainerRef.current, {
                  opacity: 0,
                  duration: reducedMotion.current ? 0 : 0.3,
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
                  onMouseEnter={() => activateRow(i)}
                  className="flex flex-col min-[1025px]:flex-row min-[1025px]:items-center justify-between py-[2.2vw] cursor-pointer group max-[1025px]:py-[3.5vw] max-md:py-[5vw] gap-2 min-[1025px]:gap-4 min-[1025px]:pr-[33vw]"
                >
                  <span className="text-[2.1vw] font-normal group-hover:text-[#ff6b00] transition-colors max-[1025px]:text-[3.8vw] max-md:text-[4.6vw]">
                    {award.title}
                  </span>
                  <span className="text-[0.95vw] text-white/50 group-hover:text-white transition-colors max-[1025px]:text-[1.8vw] max-md:text-[3.2vw] shrink-0 text-left min-[1025px]:text-right uppercase tracking-wider font-mono">
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
          className="image-container w-[30vw] h-[20vw] fixed right-[3.5vw] top-1/2 -translate-y-1/2 pointer-events-none rounded-2xl z-20 opacity-0 max-[1025px]:hidden shadow-2xl overflow-hidden border border-white/15 bg-[#08080c]"
        >
          <div className="relative w-full h-full">
            {AWARDS.map((award, idx) => (
              <div
                key={award.title}
                ref={(el) => {
                  imagesRef.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full origin-center flex items-center justify-center overflow-hidden bg-[#08080c]"
              >
                <Image
                  src={award.imgSrc}
                  width={1440}
                  height={900}
                  alt={award.title}
                  loading="lazy"
                  className={`w-full h-full ${
                    award.fit === 'contain'
                      ? 'object-contain p-3.5'
                      : 'object-cover'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
