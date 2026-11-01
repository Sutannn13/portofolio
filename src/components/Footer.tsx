'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggerButton from './StaggerButton';
import { useGetInTouchModal } from './GetInTouchModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Sutannn13',
    icon: '/github.svg',
    external: true,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/arlie.sutan',
    icon: '/instagram.svg',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sutan-arlie-38877635b',
    icon: '/linkedIn.svg',
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:sutanarliejohan@gmail.com',
    icon: '/mail.svg',
    external: false,
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { openModal } = useGetInTouchModal();

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      if (cardRef.current) gsap.set(cardRef.current, { opacity: 1, yPercent: 0 });
      return;
    }

    if (window.innerWidth <= 1025) return;

    const tween = gsap.fromTo(
      cardRef.current,
      { yPercent: 20 },
      {
        yPercent: 0,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 60%',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative overflow-hidden px-[4vw] pt-[10vw] max-[1025px]:px-[5vw] max-md:pt-[20vw]"
    >
      <Image
        src="/footer-bg.svg"
        width={1920}
        height={900}
        alt="Footer Background"
        loading="lazy"
        className="absolute -bottom-20 left-0 right-0 w-full max-md:scale-[5] max-md:bottom-0 pointer-events-none"
      />

      <div className="relative z-[1]">
        <div
          ref={cardRef}
          id="get-in-touch"
          data-section="get-in-touch"
          className="rounded-4xl bg-black/5 border border-white/30 backdrop-blur-2xl px-12 py-12 flex flex-col gap-20 justify-between max-[1025px]:flex-col max-[1025px]:items-center max-[1025px]:gap-10 max-[1025px]:px-8 max-[1025px]:py-15 max-md:px-6 max-md:gap-8"
        >
          <div className="flex justify-between items-start gap-24 footer-content max-[1025px]:gap-10 max-md:gap-16 max-[1025px]:flex-col-reverse max-[1025px]:items-center">
            <Image
              src="/johann.svg"
              width={338}
              height={172}
              alt="Johann Logo"
              loading="lazy"
              className="w-[22vw] max-[1025px]:w-[34vw] max-md:w-[46vw]"
            />
            <div className="flex flex-col gap-[2vw] items-end max-[1025px]:items-center max-[1025px]:text-center max-md:gap-[7vw]">
              <p className="text-[3.4vw] text-end w-[75%] leading-[1.15] max-[1025px]:text-[5vw] max-[1025px]:w-full max-[1025px]:text-center max-md:text-[7.5vw]">
                Ready to Bring Your Vision to Life?
              </p>
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
          </div>

          <div className="flex w-full items-end justify-between gap-36 h-auto footer-content max-[1025px]:w-full max-[1025px]:items-center max-[1025px]:text-center max-[1025px]:gap-10 max-md:gap-10 max-[1025px]:flex-col">
            <div className="w-fit text-foreground">
              <h6 className="uppercase mb-5 text-[1.25vw] max-[1025px]:text-[2.4vw] max-md:text-[4vw]">
                Reach Out
              </h6>
              <ul className="space-y-2 text-[1.25vw] max-[1025px]:text-[2.4vw] max-md:text-[4vw]">
                <li className="under-multi-parent">
                  <a href="tel:+6281917043981" className="under-multi content-p">
                    +62 819-1704-3981
                  </a>
                </li>
                <li className="under-multi-parent">
                  <a href="mailto:sutanarliejohan@gmail.com" className="under-multi content-p">
                    sutanarliejohan@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-between h-fit">
              <ul className="flex gap-4">
                {SOCIAL_LINKS.map((item, idx) => (
                  <li key={idx} className="group">
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="rounded-full relative block p-2.5 border overflow-hidden bg-white/5 transition-all duration-300 ease-in-out group-hover:scale-[0.95]"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Image
                          src={item.icon}
                          alt={item.label}
                          width={20}
                          height={20}
                          className="w-full h-full object-contain group-hover:invert transition-all duration-300 ease-in-out"
                        />
                      </div>
                      <div className="w-full h-full absolute inset-0 origin-center scale-0 group-hover:scale-100 bg-white rounded-full duration-300 ease-in-out z-[-1]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between py-8 pt-12 text-lg text-foreground max-md:flex-col max-md:gap-2 max-md:text-sm max-md:text-center max-md:py-6 max-md:pt-8">
          <p>
            Copyright{' '}
            <Link
              href="https://vault.hyperiux.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ©
            </Link>{' '}
            Johann Design 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
