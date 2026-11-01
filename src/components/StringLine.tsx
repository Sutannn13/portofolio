'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface StringLineProps {
  strokeColor?: string;
  strokeWidth?: number;
  sound?: boolean;
}

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let convolverGain: GainNode | null = null;
const NOTES = [146.83, 164.81, 196, 220, 261.63, 293.66, 329.63, 392];
const FORMANTS = [
  { frequency: 100, q: 1.2, gain: 0.5 },
  { frequency: 220, q: 2, gain: 0.3 },
];
let noteIndex = 0;

function initAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxClass) return null;
    audioCtx = new AudioCtxClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 1;
    const comp = audioCtx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.knee.value = 12;
    comp.ratio.value = 4;
    comp.attack.value = 0.006;
    comp.release.value = 0.22;
    masterGain.connect(comp);
    comp.connect(audioCtx.destination);

    const irLen = Math.floor(2.2 * audioCtx.sampleRate);
    const irBuf = audioCtx.createBuffer(2, irLen, audioCtx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = irBuf.getChannelData(c);
      for (let i = 0; i < irLen; i++) {
        const norm = i / irLen;
        d[i] = (2 * Math.random() - 1) * Math.pow(1 - norm, 1.8);
      }
    }
    const conv = audioCtx.createConvolver();
    conv.buffer = irBuf;
    convolverGain = audioCtx.createGain();
    convolverGain.gain.value = 0.42;
    convolverGain.connect(conv);
    conv.connect(masterGain);
  }
  return audioCtx;
}

export function unlockAudio() {
  const ctx = initAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
}

async function playKarplusStrong(displacement: number) {
  if (typeof window === 'undefined') return;
  const ctx = initAudioContext();
  if (!ctx || !masterGain || !convolverGain) return;

  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch {
      // Ignore policy errors until explicit user gesture
    }
  }

  // Ensure minimum audible displacement so quick sweeps or low deltas always ring cleanly
  const rawDisp = Math.abs(displacement);
  const effectiveDisp = rawDisp < 4 ? 20 : rawDisp;
  const intensity = Math.max(0.18, Math.min(effectiveDisp / 60, 1));

  noteIndex = (noteIndex + 1 + Math.floor(2 * Math.random())) % NOTES.length;
  const pitchDetune = 1 + (2 * Math.random() - 1) * 0.004;
  const freq = NOTES[noteIndex] * pitchDetune;
  const sr = ctx.sampleRate;
  const period = Math.max(2, Math.floor(sr / freq));
  const totalSamples = Math.floor(3.2 * sr);
  const outBuf = ctx.createBuffer(1, totalSamples, sr);
  const outData = outBuf.getChannelData(0);
  const delayLine = new Float32Array(period);

  let noiseFilt = 0;
  const alpha = 0.1 + 0.12 * intensity;
  for (let i = 0; i < period; i++) {
    const white = 2 * Math.random() - 1;
    noiseFilt += (white - noiseFilt) * alpha;
    const windowMul = Math.min(1, i / (0.4 * period));
    delayLine[i] = noiseFilt * windowMul;
  }

  const feedback = 0.996 - (1 - intensity) * 0.003;
  let pIdx = 0;
  let prevSample = 0;
  for (let i = 0; i < totalSamples; i++) {
    const cur = delayLine[pIdx];
    const nextVal = delayLine[(pIdx + 1) % period];
    const filtered = 0.75 * ((cur + nextVal) * 0.5) + 0.25 * prevSample;
    prevSample = filtered;
    delayLine[pIdx] = filtered * feedback;
    outData[i] = cur;
    pIdx = (pIdx + 1) % period;
  }

  const srcNode = ctx.createBufferSource();
  srcNode.buffer = outBuf;

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 750 + 700 * intensity;
  lp.Q.value = 0.5;

  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 70;

  srcNode.connect(lp);
  lp.connect(hp);

  const subGain = ctx.createGain();
  subGain.gain.value = 1;
  hp.connect(subGain);

  FORMANTS.forEach(({ frequency, q, gain }) => {
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = frequency;
    bp.Q.value = q;
    const gNode = ctx.createGain();
    gNode.gain.value = gain;
    hp.connect(bp);
    bp.connect(gNode);
    gNode.connect(subGain);
  });

  const envGain = ctx.createGain();
  const peak = 0.35 + 0.45 * intensity;
  const now = ctx.currentTime;
  envGain.gain.setValueAtTime(0.0001, now);
  envGain.gain.exponentialRampToValueAtTime(peak, now + 0.025);
  envGain.gain.exponentialRampToValueAtTime(0.45 * peak, now + 0.6);
  envGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

  subGain.connect(envGain);

  const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
  if (panner) {
    panner.pan.value = (2 * Math.random() - 1) * 0.35;
    envGain.connect(panner);
    panner.connect(masterGain);
    panner.connect(convolverGain);
  } else {
    envGain.connect(masterGain);
    envGain.connect(convolverGain);
  }

  srcNode.start(now);
  srcNode.stop(now + 3.2);
  srcNode.onended = () => {
    srcNode.disconnect();
    lp.disconnect();
    hp.disconnect();
    subGain.disconnect();
    envGain.disconnect();
    panner?.disconnect();
  };
}

export default function StringLine({
  strokeColor = '#111111',
  strokeWidth = 2,
  sound = true,
}: StringLineProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const displacementRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const phaseRef = useRef(Math.PI / 2);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Global user gesture unlocker to allow Web Audio API playback
  useEffect(() => {
    const handleGesture = () => unlockAudio();
    const events = ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'wheel', 'scroll', 'mousemove', 'pointermove'];
    events.forEach((evt) => window.addEventListener(evt, handleGesture, { passive: true }));
    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleGesture));
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const updatePath = useCallback((dy: number) => {
    const p = pathRef.current;
    const w = wrapperRef.current;
    if (!p || !w) return;
    const width = w.offsetWidth || (typeof window !== 'undefined' ? window.innerWidth : 1200);
    p.setAttributeNS(null, 'd', `M 0 50 Q ${0.5 * width} ${50 + dy} ${width} 50`);
  }, []);

  useEffect(() => {
    updatePath(reducedMotion ? 0 : displacementRef.current);
    const onResize = () => updatePath(reducedMotion ? 0 : displacementRef.current);
    window.addEventListener('resize', onResize);

    const w = wrapperRef.current;
    let ro: ResizeObserver | null = null;
    if (w && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updatePath(reducedMotion ? 0 : displacementRef.current);
      });
      ro.observe(w);
    }

    return () => {
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, updatePath]);

  const onOscillate = useCallback(() => {
    updatePath(displacementRef.current * Math.sin(phaseRef.current));
    displacementRef.current = 0.95 * displacementRef.current;
    phaseRef.current += 0.5;
    if (Math.abs(displacementRef.current) > 0.1) {
      rafRef.current = requestAnimationFrame(onOscillate);
    } else {
      phaseRef.current = Math.PI / 2;
      displacementRef.current = 0;
      updatePath(0);
    }
  }, [updatePath]);

  const pluckString = useCallback(
    (disp?: number) => {
      if (reducedMotion) return;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      const pluckDisp = typeof disp === 'number' && Math.abs(disp) > 2 ? disp : 24;
      displacementRef.current = pluckDisp;
      if (sound) playKarplusStrong(pluckDisp);
      onOscillate();
    },
    [reducedMotion, sound, onOscillate]
  );

  return (
    <div ref={wrapperRef} className="w-full">
      <div className="string-line lineDraw">
        <span
          onMouseEnter={
            reducedMotion
              ? undefined
              : () => {
                  unlockAudio();
                  if (rafRef.current != null) {
                    cancelAnimationFrame(rafRef.current);
                    phaseRef.current = Math.PI / 2;
                  }
                  if (displacementRef.current === 0) {
                    displacementRef.current = 14;
                  }
                }
          }
          onMouseLeave={
            reducedMotion
              ? undefined
              : () => {
                  if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
                  const currentDisp = displacementRef.current || 18;
                  if (sound) playKarplusStrong(currentDisp);
                  onOscillate();
                }
          }
          onMouseMove={
            reducedMotion
              ? undefined
              : (e) => {
                  displacementRef.current += (e.movementY || 0) * 0.75;
                  displacementRef.current = Math.max(-48, Math.min(48, displacementRef.current));
                  updatePath(displacementRef.current);
                }
          }
          onPointerDown={
            reducedMotion
              ? undefined
              : () => {
                  unlockAudio();
                  pluckString(28);
                }
          }
          onClick={
            reducedMotion
              ? undefined
              : () => {
                  unlockAudio();
                  pluckString(28);
                }
          }
          className="box cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Pluck guitar string"
        />
        <svg width="100%" height={100} className="pointer-events-none">
          <path
            ref={pathRef}
            d="M 0 50 L 3000 50"
            strokeWidth={strokeWidth}
            fill="none"
            style={{ stroke: strokeColor }}
          />
        </svg>
      </div>
    </div>
  );
}
