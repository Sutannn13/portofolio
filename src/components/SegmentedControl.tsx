'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
  badge?: number | string;
}

export interface SegmentedControlProps<T extends string = string> {
  tabs: readonly TabOption<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  className?: string;
  ariaLabel?: string;
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function SegmentedControl<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className = '',
  ariaLabel = 'Segmented navigation tabs',
}: SegmentedControlProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
    ready: boolean;
  }>({
    left: 0,
    width: 0,
    ready: false,
  });

  const updateIndicator = () => {
    const activeEl = tabRefs.current[activeTab];
    if (activeEl) {
      setIndicator({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        ready: true,
      });
    }
  };

  useIsomorphicLayoutEffect(() => {
    updateIndicator();
  }, [activeTab]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timer = setTimeout(updateIndicator, 40);

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => {
        updateIndicator();
      });
      ro.observe(container);
      return () => {
        clearTimeout(timer);
        ro.disconnect();
      };
    } else {
      window.addEventListener('resize', updateIndicator);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateIndicator);
      };
    }
  }, [tabs]);

  return (
    <div
      ref={containerRef}
      role='tablist'
      aria-label={ariaLabel}
      className={`relative inline-flex items-center rounded-full border border-white/10 bg-[#0e0d11] p-1 select-none backdrop-blur-md ${className}`}
    >
      {/* Smooth Horizontal Sliding Orange Indicator Pill */}
      <span
        aria-hidden='true'
        className={`absolute bottom-1 top-1 rounded-full bg-[#F16B0D] shadow-[0_2px_14px_rgba(241,107,13,0.4)] will-change-[transform,width] ${
          indicator.ready
            ? 'transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]'
            : 'opacity-0'
        }`}
        style={{
          transform: `translateX(${indicator.left}px)`,
          width: `${indicator.width}px`,
        }}
      />

      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={(node) => {
              tabRefs.current[tab.id] = node;
            }}
            type='button'
            role='tab'
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={`relative z-10 cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-xs whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16B0D] ${
              isActive
                ? 'font-medium text-white'
                : 'text-white/55 hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`ml-1.5 rounded-full px-1.5 py-0.5 font-mono text-[10px] transition-colors ${
                  isActive
                    ? 'bg-black/25 text-white'
                    : 'bg-white/10 text-white/50'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
