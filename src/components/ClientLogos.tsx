'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Copy from './Copy';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CLIENT_LOGOS = [
  { src: '/clients-1.webp', alt: 'Google logo' },
  { src: '/clients-2.webp', alt: 'Adobe logo' },
  { src: '/clients-3.webp', alt: 'JP logo' },
  { src: '/clients-4.webp', alt: 'Pinterest logo' },
  { src: '/clients-5.webp', alt: 'IBM logo' },
  { src: '/clients-6.webp', alt: 'Intel logo' },
];

const ALL_LOGOS = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

export default function ClientLogos() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const container = gridRef.current;
      if (!container) return;
      const items = Array.from(container.querySelectorAll('.grid__item')) as HTMLElement[];
      const count = items.length;
      if (count === 0) return;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 20%',
          end: 'bottom center',
          scrub: true,
        },
      });

      const isDesktop = globalThis.innerWidth > 1024;
      const d1 = isDesktop ? 1.5 : 4;
      const d2 = isDesktop ? 1.5 : 3.5;
      const staggerCluster = d1 + 0.4;
      const staggerItem = isDesktop ? 0.4 : 0.5;

      const clusters: number[][] = [];
      for (let i = 0; i < count; ) {
        const size = Math.min(count - i, gsap.utils.random(2, 3, 1));
        clusters.push(Array.from({ length: size }, (_, k) => i + k));
        i += size;
      }

      clusters.forEach((cluster, clusterIdx) => {
        const clusterStart = clusterIdx * staggerCluster;
        cluster.forEach((itemIdx, posInCluster) => {
          const item = items[itemIdx];
          const itemStart = clusterStart + posInCluster * staggerItem;

          gsap.set(item, {
            transformOrigin: '0% 0%',
            opacity: 0,
            x: isDesktop ? gsap.utils.random(-180, 180) : 0,
            y: gsap.utils.random(-180, 180),
            filter: 'blur(10px)',
            z: isDesktop ? gsap.utils.random(-2200, -1600) : gsap.utils.random(-550, -400),
          });

          tl.to(
            item,
            {
              z: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: d1,
            },
            itemStart
          ).to(
            item,
            {
              filter: 'blur(10px)',
              opacity: 0,
              z: isDesktop ? gsap.utils.random(1400, 1800) : gsap.utils.random(500, 700),
              duration: d2,
            },
            itemStart + d1
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="clientblur"
      className="relative w-screen h-[240vh] text-center z-2 bg-[#070707]"
    >
      <div className="sticky w-full top-0 h-screen flex items-center justify-center">
        <div className="w-3/5 max-lg:w-4/5">
          <Copy stagger={0.015}>
            <h3 className="text-[5.5vw] text-white leading-[1.2] max-lg:text-[7vw] max-md:text-[8vw]">
              Trusted by Founders and Creatives, Built for Ambitious Brands.
            </h3>
          </Copy>
        </div>

        <div
          ref={gridRef}
          className="absolute inset-0 w-full h-full pointer-events-none [perspective:1000px] overflow-hidden flex items-center justify-center"
        >
          {ALL_LOGOS.map((logo, i) => (
            <div
              key={i}
              className="grid__item absolute flex items-center justify-center p-4 will-change-[transform,filter,opacity]"
            >
              <Image
                src={logo.src}
                width={120}
                height={50}
                alt={logo.alt}
                loading="lazy"
                className="w-[10vw] max-[1025px]:w-[16vw] max-md:w-[24vw] object-contain opacity-70"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
