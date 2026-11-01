'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import StaggerButton from './StaggerButton';
import { useGetInTouchModal } from './GetInTouchModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useGetInTouchModal();
  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const reducedMotion = useRef(false);

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
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const curY = window.scrollY;
      setIsScrolled(curY > 0.4 * window.innerHeight);

      if (!reducedMotion.current && headerRef.current) {
        const dy = curY - lastScrollY.current;
        if (dy > 0 && curY > 0 && !isHidden.current) {
          isHidden.current = true;
          gsap.to(headerRef.current, {
            yPercent: -100,
            duration: 0.5,
            ease: 'power3.out',
          });
        } else if (dy < 0 && isHidden.current) {
          isHidden.current = false;
          gsap.to(headerRef.current, {
            yPercent: 0,
            duration: 0.5,
            ease: 'power3.out',
          });
        }
      }
      lastScrollY.current = curY;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      id="header"
      className={`w-screen h-fit py-[1.5vw] flex items-center justify-between px-[4vw] fixed inset-0 z-99 opacity-0 transition-[backdrop-filter] duration-500 ease-out max-[1025px]:py-[3vw] max-[1025px]:px-[5vw] max-md:py-4 ${
        isScrolled ? 'backdrop-blur-lg' : 'backdrop-blur-none'
      }`}
    >
      <Link href="/" id="header-logo" className="">
        <Image
          src="/johann.svg"
          width={338}
          height={172}
          alt="Johann Logo"
          loading="lazy"
          className="w-[12vw] max-[1025px]:w-[25vw] max-md:w-[34vw]"
        />
      </Link>
      <StaggerButton
        btnText="Get in Touch"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          openModal();
        }}
        variant="charge"
        textClassName="font-medium text-[1.15vw] max-[1025px]:text-[3vw] max-md:text-[4.2vw]"
      />
    </header>
  );
}
