'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef, ReactNode } from 'react';
import { useLenis } from 'lenis/react';

const CLOSE_MS = 340;

type Phase = 'closed' | 'open' | 'closing';

interface GetInTouchModalContextType {
  openModal: () => void;
}

const GetInTouchModalContext = createContext<GetInTouchModalContextType | null>(null);

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="relative shrink-0 size-14 rounded-full overflow-hidden flex items-center justify-center cursor-pointer max-[1025px]:size-11 max-md:size-9 group"
    >
      <div className="absolute inset-0 w-full h-full bg-linear-to-r from-[#F16B0D] to-[#E61416]" />
      <span className="absolute h-0.5 z-2 w-4 rounded-full bg-white rotate-45 max-md:w-3 group-hover:rotate-225 duration-500 ease-in-out" />
      <span className="absolute h-0.5 z-2 w-4 rounded-full bg-white -rotate-45 max-md:w-3 group-hover:rotate-135 duration-500 ease-in-out" />
    </button>
  );
}

export function GetInTouchModalProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>('closed');
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback(() => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setPhase('open');
  }, []);

  const closeModal = useCallback(() => {
    setPhase((p) => (p === 'closed' ? p : 'closing'));
  }, []);

  const isMounted = phase !== 'closed';

  // scroll lock while the dialog is on screen (lenis drives the page)
  useEffect(() => {
    if (!isMounted) return;
    lenis?.stop();
    return () => lenis?.start();
  }, [isMounted, lenis]);

  // unmount only after the exit transition has played out
  useEffect(() => {
    if (phase !== 'closing') return;
    const timer = window.setTimeout(() => {
      setPhase('closed');
      lastFocusRef.current?.focus?.({ preventScroll: true });
    }, CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // move focus into the dialog, Escape closes
  useEffect(() => {
    if (phase !== 'open') return;
    panelRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, closeModal]);

  const contextValue = useMemo(() => ({ openModal }), [openModal]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log('Get in touch form submitted:', data);
    closeModal();
  };

  return (
    <GetInTouchModalContext.Provider value={contextValue}>
      {children}
      {isMounted && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="get-in-touch-modal-title"
          data-state={phase === 'closing' ? 'closing' : 'open'}
          data-lenis-prevent
          className={`gi-overlay fixed inset-0 z-100 flex items-center justify-center p-[4vw] max-md:p-3 bg-black/80 backdrop-blur-md overflow-y-auto ${
            phase === 'closing' ? 'pointer-events-none' : ''
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            ref={panelRef}
            tabIndex={-1}
            data-lenis-prevent
            className="gi-panel relative w-full max-w-[75vw] max-h-[85vh] overflow-y-auto rounded-[2vw] bg-[#0c0c0c]/90 backdrop-blur-xl border border-white/10 text-white p-[3vw] max-[1025px]:max-w-[88vw] max-[1025px]:p-8 max-md:max-w-full max-md:max-h-[88dvh] max-md:p-6 max-md:rounded-3xl focus:outline-none overscroll-contain touch-pan-y"
          >
            <div className="absolute top-[2vw] right-[2vw] max-[1025px]:top-6 max-[1025px]:right-6 max-md:top-4 max-md:right-4 z-10">
              <CloseButton onClick={closeModal} />
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-[3vw] items-start max-[1025px]:grid-cols-1 max-[1025px]:gap-6 pt-[4vw] max-md:pt-2">
              <div>
                <h2
                  id="get-in-touch-modal-title"
                  className="text-[4.8vw] leading-[1.1]! max-[1025px]:text-[5vw] max-md:text-[8vw]"
                >
                  Get in Touch
                </h2>
                <p className="mt-[1vw] text-[1.1vw] text-white max-[1025px]:text-[2.4vw] max-md:text-[4vw]">
                  Drop me a message
                </p>
              </div>
              <div className="get-in-touch-form">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
                  <div>
                    <label className="block text-sm mb-1 text-white/80">Your Name*</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-5 py-3 rounded-full bg-white/15 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#F16B0D]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-white/80">Email Address*</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full px-5 py-3 rounded-full bg-white/15 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#F16B0D]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-white/80">Subject*</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="Project Inquiry"
                      className="w-full px-5 py-3 rounded-full bg-white/15 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#F16B0D]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-white/80">Phone Number*</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-5 py-3 rounded-full bg-white/15 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#F16B0D]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-white/80">Your Message*</label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder="Tell me about your project..."
                      className="w-full px-5 py-3 rounded-2xl bg-white/15 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#F16B0D] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 mb-2 w-full py-3.5 rounded-full bg-[#F16B0D] hover:bg-[#E61416] transition-colors font-medium text-white cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </GetInTouchModalContext.Provider>
  );
}

export function useGetInTouchModal() {
  const context = useContext(GetInTouchModalContext);
  if (!context) {
    throw new Error('useGetInTouchModal must be used within GetInTouchModalProvider');
  }
  return context;
}
