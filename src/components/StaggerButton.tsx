"use client";

import React from "react";
import Link from "next/link";

export interface StaggerButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  btnText?: string;
  href?: string;
  className?: string;
  textClassName?: string;
  bgColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  dotColor?: string;
  variant?: "charge" | "solid";
}

export default function StaggerButton({
  btnText = "",
  href = "#",
  className = "",
  textClassName = "",
  bgColor,
  textColor,
  hoverTextColor,
  dotColor,
  variant = "charge",
  ...rest
}: StaggerButtonProps) {
  void hoverTextColor;
  const chars = Array.from(btnText);
  const isCharge = variant === "charge";

  if (!isCharge) {
    const solidBg = bgColor || "#ffffff";
    const solidText = textColor || "#111111";
    const solidDot = dotColor || "#070707";

    return (
      <Link
        href={href}
        {...rest}
        className={`group relative flex w-fit items-center justify-center gap-[0.9vw] h-[3.5vw] px-[2vw] rounded-full overflow-hidden whitespace-nowrap no-underline font-medium text-[1.5vw] border border-white/20 shadow-[0_0_22px_4px_rgba(255,255,255,0.14)] transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white hover:shadow-[0_0_12px_1px_rgba(255,255,255,0.4)] max-[1025px]:gap-[1.6vw] max-[1025px]:h-[8vw] max-[1025px]:px-[3.5vw] max-[1025px]:text-[3vw] max-[1025px]:font-normal max-md:gap-[2.4vw] max-md:h-[12vw] max-md:px-[5vw] max-md:text-[4.2vw] ${className}`}
        style={{
          background: solidBg,
          color: solidText,
        }}
      >
        <span
          aria-hidden={true}
          className="relative z-10 flex shrink-0 items-center justify-center w-[0.5vw] h-[0.5vw] max-[1025px]:w-[1.5vw] max-[1025px]:h-[1.5vw] max-md:w-[2.3vw] max-md:h-[2.3vw]"
          style={{ marginTop: "0.08em" }}
        >
          <span
            className="w-full h-full rounded-full transition-transform duration-300 group-hover:scale-125"
            style={{ background: solidDot }}
          />
        </span>
        <span className={`relative z-20 block leading-[1.3] ${textClassName}`}>
          {btnText}
        </span>
        <span
          aria-hidden="true"
          className="block shrink-0 w-[0.5vw] max-[1025px]:w-[1.5vw] max-md:w-[2.3vw]"
        />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      {...rest}
      className={`charge-btn group relative flex w-fit items-center justify-center gap-[0.9vw] h-[3.5vw] px-[2vw] rounded-full overflow-hidden whitespace-nowrap no-underline select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white max-[1025px]:gap-[1.6vw] max-[1025px]:h-[8vw] max-[1025px]:px-[3.5vw] max-md:gap-[2.4vw] max-md:h-[12vw] max-md:px-[5vw] ${className}`}
    >
      {/* 1. Liquid White Charge Fill (Sweeps smoothly from left to right on hover, drains right to left on unhover) */}
      <span aria-hidden="true" className="charge-btn__fill">
        <span className="charge-btn__crest" />
      </span>

      {/* 2. Subtle Shimmer Glint across the glass */}
      <span aria-hidden="true" className="charge-btn__glint" />

      {/* 3. Charging Indicator Dot */}
      <span
        aria-hidden="true"
        className="relative z-20 flex shrink-0 items-center justify-center w-[0.5vw] h-[0.5vw] max-[1025px]:w-[1.5vw] max-[1025px]:h-[1.5vw] max-md:w-[2.3vw] max-md:h-[2.3vw]"
        style={{ marginTop: "0.08em" }}
      >
        <span className="charge-btn__dot-halo" />
        <span className="charge-btn__dot" />
      </span>

      {/* 4. Layout Spacer Text */}
      <span
        aria-hidden="true"
        className={`invisible block h-[1.3em] leading-[1.3] text-[1.15vw] max-[1025px]:text-[3vw] max-md:text-[4.2vw] whitespace-nowrap ${textClassName}`}
      >
        {btnText}
      </span>

      {/* 5. Synchronized Characters: Turn from White to Black right as the white charge wave passes underneath */}
      <span
        className={`absolute left-1/2 top-1/2 z-20 block h-[1.3em] -translate-x-1/2 -translate-y-1/2 overflow-hidden text-[1.15vw] max-[1025px]:text-[3vw] max-md:text-[4.2vw] whitespace-nowrap ${textClassName}`}
        style={{ marginTop: "0.08em" }}
      >
        <span className="block leading-[1.3]">
          {chars.map((ch, idx) => (
            <span
              key={idx}
              className="charge-btn__char"
              style={
                {
                  "--char-idx": idx,
                  "--char-rev": chars.length - 1 - idx,
                  whiteSpace: ch === " " ? "pre" : undefined,
                } as React.CSSProperties
              }
            >
              {ch}
            </span>
          ))}
        </span>
      </span>

      {/* 6. Optical Balance Spacer */}
      <span
        aria-hidden="true"
        className="block shrink-0 w-[0.5vw] max-[1025px]:w-[1.5vw] max-md:w-[2.3vw]"
      />
    </Link>
  );
}

