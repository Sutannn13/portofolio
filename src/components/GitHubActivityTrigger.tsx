'use client';

import React, { useEffect, useRef, useState } from 'react';
import Copy from './Copy';
import StringLine from './StringLine';
import HoldChargeButton from './HoldChargeButton';
import { usePagePullTransition } from './PagePullTransition';
import {
  fetchGitHubDashboardData,
  formatRelativeTime,
  VERIFIED_GITHUB_FALLBACK,
  type GitHubDashboardData,
} from '@/content/github-activity';

const BTN_LABEL = 'Hold 2s to Open Activity';

export default function GitHubActivityTrigger() {
  const { triggerPagePull, isPulling } = usePagePullTransition();
  const [data, setData] = useState<GitHubDashboardData>(VERIFIED_GITHUB_FALLBACK);
  const [progress, setProgress] = useState(0); // driven by HoldChargeButton for card visuals

  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchGitHubDashboardData().then((live) => {
      if (mounted) setData(live);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const resetTriggerCard = () => {
      setProgress(0);
      const el = cardRef.current;
      if (el) {
        el.style.setProperty('--tilt-x', '0deg');
        el.style.setProperty('--tilt-y', '0deg');
      }
    };
    if (!isPulling) {
      resetTriggerCard();
    }
    window.addEventListener('ppt:arrive', resetTriggerCard);
    return () => window.removeEventListener('ppt:arrive', resetTriggerCard);
  }, [isPulling]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--tilt-x', `${(-ny * 8).toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${(nx * 10).toFixed(2)}deg`);
  };

  const handleCardMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  const recentWeeks = data.contributions.slice(-84); // Last 12 weeks mini preview
  const topThreeRepos = data.repositories.slice(0, 3);
  const elapsedSeconds = (progress * 2).toFixed(1);
  const percentValue = Math.round(progress * 100);

  return (
    <section
      id="github-portal"
      className="relative w-screen overflow-hidden bg-[#070707] py-[7vw] text-white max-md:py-[14vw]"
    >
      <div className="w-screen px-[4vw] max-[1025px]:px-[5vw]">
        <div className="relative h-px w-full">
          <StringLine strokeColor="rgba(255, 255, 255, 0.35)" strokeWidth={1} />
        </div>

        <div className="grid grid-cols-1 items-center gap-[5vw] py-[5.5vw] lg:grid-cols-12 max-md:gap-10 max-md:py-[10vw]">
          {/* Left Column: Editorial Context & Real-Time Metrics */}
          <div className="flex flex-col items-start lg:col-span-6">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full bg-white/[0.04] px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F16B0D] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F16B0D]" />
              </span>
              <span className="font-mono text-[0.78vw] uppercase tracking-[0.24em] text-white/70 max-[1025px]:text-xs">
                Open Source Telemetry // @{data.profile.login}
              </span>
            </div>

            <Copy stagger={0.015}>
              <h2 className="text-[4.8vw] leading-[1.18] pb-1 tracking-tight text-white max-[1025px]:text-[6.2vw] max-md:text-[8.2vw]">
                See What I&apos;m
                <br />
                Currently Building
              </h2>
            </Copy>

            <p className="mt-[1.6vw] max-w-[38rem] text-[1.15vw] leading-[1.6] text-white/65 max-[1025px]:mt-4 max-[1025px]:text-base max-md:text-sm">
              Live commits, active repositories, and contribution frequency pulled from{' '}
              <span className="text-white">@{data.profile.login}</span> on GitHub. Hold the
              charge trigger for two full seconds to pull the dedicated activity workspace into
              view.
            </p>

            {/* Verified Live Telemetry Readout */}
            <div className="mt-[2.8vw] grid w-full grid-cols-3 gap-2.5 sm:gap-6 border-t border-white/10 pt-[2vw] max-[1025px]:mt-8 max-[1025px]:pt-6 max-md:gap-2.5 max-md:pt-5">
              <div className="flex flex-col justify-between rounded-2xl bg-white/[0.03] p-3 border border-white/5 sm:rounded-none sm:bg-transparent sm:p-0 sm:border-0 min-w-0">
                <span className="font-mono text-[9.5px] leading-snug sm:text-[11px] lg:text-[0.72vw] uppercase tracking-[0.06em] sm:tracking-[0.16em] lg:tracking-[0.2em] text-white/45 min-h-[2.4em] sm:min-h-0 flex items-start">
                  Contributions (1Y)
                </span>
                <p className="mt-2 sm:mt-1 text-2xl sm:text-3xl lg:text-[2.4vw] font-medium leading-none tracking-tight text-white">
                  {data.totalContributionsLastYear}
                </p>
              </div>
              <div className="flex flex-col justify-between rounded-2xl bg-white/[0.03] p-3 border border-white/5 sm:rounded-none sm:bg-transparent sm:p-0 sm:border-0 min-w-0">
                <span className="font-mono text-[9.5px] leading-snug sm:text-[11px] lg:text-[0.72vw] uppercase tracking-[0.06em] sm:tracking-[0.16em] lg:tracking-[0.2em] text-white/45 min-h-[2.4em] sm:min-h-0 flex items-start">
                  Public Repos
                </span>
                <p className="mt-2 sm:mt-1 text-2xl sm:text-3xl lg:text-[2.4vw] font-medium leading-none tracking-tight text-white">
                  {data.profile.publicRepos}
                </p>
              </div>
              <div className="flex flex-col justify-between rounded-2xl bg-white/[0.03] p-3 border border-white/5 sm:rounded-none sm:bg-transparent sm:p-0 sm:border-0 min-w-0">
                <span className="font-mono text-[9.5px] leading-snug sm:text-[11px] lg:text-[0.72vw] uppercase tracking-[0.06em] sm:tracking-[0.16em] lg:tracking-[0.2em] text-white/45 min-h-[2.4em] sm:min-h-0 flex items-start">
                  Stars Earned
                </span>
                <p className="mt-2 sm:mt-1 text-2xl sm:text-3xl lg:text-[2.4vw] font-medium leading-none tracking-tight text-[#F16B0D]">
                  {data.totalStars}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Hold-to-Charge Launchpad */}
          <div className="lg:col-span-6" style={{ perspective: '1200px' }}>
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="
                gh-portal-card relative overflow-hidden rounded-[28px]
                border border-white/12 bg-[#0d0d10] p-[2.6vw]
                transition-transform duration-300 ease-out
                max-[1025px]:p-7 max-md:p-5
              "
              style={{
                transform: `rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) scale(${
                  1 + progress * 0.025
                })`,
                boxShadow:
                  progress > 0
                    ? `0 30px 90px rgba(0,0,0,0.85), 0 0 ${Math.round(
                        progress * 65
                      )}px rgba(241, 107, 13, ${(0.18 + progress * 0.42).toFixed(2)})`
                    : '0 24px 70px rgba(0,0,0,0.7)',
              }}
            >
              {/* Ambient Charge Glow inside Card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl transition-opacity duration-200"
                style={{
                  background:
                    'radial-gradient(circle, rgba(241,107,13,0.48) 0%, rgba(230,20,22,0.12) 60%, transparent 100%)',
                  opacity: 0.2 + progress * 0.75,
                }}
              />

              {/* Top Bar of Deck */}
              <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="text-white/85"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-white">
                      github.com/{data.profile.login}
                    </p>
                    <p className="font-mono text-[11px] text-white/45">
                      {data.isLive ? 'Live API Connected' : 'Verified Snapshot'} {'// Active'}{' '}
                      {topThreeRepos[0] ? formatRelativeTime(topThreeRepos[0].pushedAt) : 'recently'}
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-xs text-white/75">
                  {elapsedSeconds}s / 2.0s
                </span>
              </div>

              {/* Mini 12-Week Activity Matrix Preview */}
              <div className="relative z-10 mt-5">
                <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/40">
                  <span>Recent Contribution Pulse</span>
                  <span className="text-[#F16B0D]">{percentValue}% Charged</span>
                </div>
                <div
                  aria-hidden="true"
                  className="grid grid-cols-12 gap-1.5 rounded-2xl bg-black/45 p-3.5"
                >
                  {Array.from({ length: 12 }).map((_, colIdx) => {
                    const weekSlice = recentWeeks.slice(colIdx * 7, colIdx * 7 + 7);
                    const colThreshold = (colIdx + 1) / 12;
                    const isLitByCharge = progress >= colThreshold;
                    return (
                      <div key={colIdx} className="flex flex-col gap-1.5">
                        {weekSlice.map((day, dIdx) => {
                          const baseBg =
                            day.level === 0
                              ? 'rgba(255,255,255,0.06)'
                              : day.level === 1
                              ? 'rgba(241,107,13,0.32)'
                              : day.level === 2
                              ? 'rgba(241,107,13,0.56)'
                              : 'rgba(241,107,13,0.92)';
                          return (
                            <span
                              key={day.date || dIdx}
                              className="h-2.5 w-full rounded-[3px] transition-colors duration-150"
                              style={{
                                background: isLitByCharge ? '#ffffff' : baseBg,
                              }}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Pushed Repos Strip */}
              <div className="relative z-10 mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {topThreeRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className="rounded-xl bg-white/[0.03] px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
                  >
                    <p className="truncate text-xs font-medium text-white">{repo.name}</p>
                    <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-white/45">
                      <span>{repo.language || 'Code'}</span>
                      <span>{formatRelativeTime(repo.pushedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive 2-Second Hold-to-Charge Button (Liquid White Fill like Get in Touch) */}
              <HoldChargeButton
                label={BTN_LABEL}
                holdMs={2000}
                disabled={isPulling}
                onProgress={setProgress}
                onComplete={() =>
                  triggerPagePull('/activity', 'forward', 'LIVE GITHUB ACTIVITY')
                }
                ariaLabel="Hold for 2 seconds to open GitHub Live Activity page"
                hintIdle="Press and hold for 2.0 seconds to charge and pull the live activity page"
                hintActive="Charging portal... keep holding until 2.0s"
                hintReleased="Released early. Hold full 2.0 seconds to pull the page"
                hintDone="Charged 100% // Pulling GitHub Live Activity..."
              />
            </div>
          </div>
        </div>

        <div className="relative h-px w-full">
          <StringLine strokeColor="rgba(255, 255, 255, 0.35)" strokeWidth={1} />
        </div>
      </div>
    </section>
  );
}
