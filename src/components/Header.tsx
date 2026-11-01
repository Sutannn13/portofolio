'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggerButton from './StaggerButton';
import { useGetInTouchModal } from './GetInTouchModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useGetInTouchModal();
  const headerRef = useRef<HTMLElement | null>(null);
  const navGetInTouchRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const reducedMotion = useRef(false);
  const isInGetInTouchSection = useRef(false);

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

    const fadeGetInTouch = (show: boolean) => {
      if (!navGetInTouchRef.current) return;
      if (reducedMotion.current) {
        gsap.to(navGetInTouchRef.current, {
          opacity: show ? 1 : 0,
          duration: 0.35,
          pointerEvents: show ? 'auto' : 'none',
          overwrite: 'auto',
        });
        return;
      }
      gsap.to(navGetInTouchRef.current, {
        opacity: show ? 1 : 0,
        filter: show ? 'blur(0px)' : 'blur(12px)',
        scale: show ? 1 : 0.92,
        y: show ? 0 : -6,
        duration: 0.55,
        ease: 'power2.out',
        pointerEvents: show ? 'auto' : 'none',
        overwrite: 'auto',
      });
    };

    const checkGetInTouchVisibility = () => {
      const section =
        document.getElementById('get-in-touch') ||
        document.getElementById('footer');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inSection = rect.top <= window.innerHeight * 0.85;

      if (inSection !== isInGetInTouchSection.current) {
        isInGetInTouchSection.current = inSection;
        fadeGetInTouch(!inSection);
      }
    };

    const onScroll = () => {
      const curY = window.scrollY;
      setIsScrolled(curY > 0.4 * window.innerHeight);

      if (curY <= 12 && isHidden.current && headerRef.current) {
        isHidden.current = false;
        gsap.to(headerRef.current, {
          yPercent: 0,
          duration: 0.4,
          ease: 'power3.out',
        });
      } else if (!reducedMotion.current && headerRef.current) {
        const dy = curY - lastScrollY.current;
        if (dy > 0 && curY > 12 && !isHidden.current) {
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
      checkGetInTouchVisibility();
    };

    let st: ScrollTrigger | null = null;
    const targetSection =
      document.getElementById('get-in-touch') ||
      document.getElementById('footer');

    if (targetSection) {
      st = ScrollTrigger.create({
        trigger: targetSection,
        start: 'top 85%',
        end: 'max',
        onEnter: () => {
          if (!isInGetInTouchSection.current) {
            isInGetInTouchSection.current = true;
            fadeGetInTouch(false);
          }
        },
        onLeaveBack: () => {
          if (isInGetInTouchSection.current) {
            isInGetInTouchSection.current = false;
            fadeGetInTouch(true);
          }
        },
        onEnterBack: () => {
          if (!isInGetInTouchSection.current) {
            isInGetInTouchSection.current = true;
            fadeGetInTouch(false);
          }
        },
      });
    }

    const onArrive = () => {
      isHidden.current = false;
      lastScrollY.current = window.scrollY;
      if (headerRef.current) {
        gsap.set(headerRef.current, { yPercent: 0, opacity: 1 });
      }
      setIsScrolled(window.scrollY > 0.4 * window.innerHeight);
      isInGetInTouchSection.current = false;
      fadeGetInTouch(true);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    onScroll();
    checkGetInTouchVisibility();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('ppt:arrive', onArrive);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('ppt:arrive', onArrive);
      st?.kill();
    };
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
      <div
        ref={navGetInTouchRef}
        id="navbar-get-in-touch"
        className="will-change-[transform,opacity,filter]"
      >
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
      </div>
    </header>
  );
}
