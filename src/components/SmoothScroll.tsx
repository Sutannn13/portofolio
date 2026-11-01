'use client';

import { ReactNode, useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
}

function LenisGlobalExposer() {
  const lenis = useLenis();
  useEffect(() => {
    if (typeof window !== 'undefined' && lenis) {
      (window as any).lenis = lenis;
      (window as any).lenisVersion = '1.3.26';

      lenis.on('scroll', ScrollTrigger.update);

      return () => {
        lenis.off('scroll', ScrollTrigger.update);
      };
    }
  }, [lenis]);
  return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: true,
      }}
    >
      <LenisGlobalExposer />
      {children}
    </ReactLenis>
  );
}

export { useLenis };
