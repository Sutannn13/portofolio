'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import Copy from './Copy';
import StringLine from './StringLine';
import Footer from './Footer';
import HoldChargeButton from './HoldChargeButton';
import { usePagePullTransition } from './PagePullTransition';
import {
  fetchGitHubDashboardData,
  formatRelativeTime,
  VERIFIED_GITHUB_FALLBACK,
  type ContributionDay,
  type GitHubDashboardData,
  type GitHubRepository,
} from '@/content/github-activity';
import SegmentedControl, { type TabOption } from './SegmentedControl';

export type RepoTab = 'all' | 'code' | 'commits';

const REPO_TABS: readonly TabOption<RepoTab>[] = [
  { id: 'all', label: 'All' },
  { id: 'code', label: 'Code & Forks' },
  { id: 'commits', label: 'Commits' },
];

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function GitHubActivityView() {
  const { triggerPagePull, isPulling } = usePagePullTransition();

  const [data, setData] = useState<GitHubDashboardData>(VERIFIED_GITHUB_FALLBACK);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [refreshError, setRefreshError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
  const [activeTab, setActiveTab] = useState<RepoTab>('all');
  const [langFilter, setLangFilter] = useState<string>('All');
  const [repoQuery, setRepoQuery] = useState<string>('');

  const heroRef = useRef<HTMLDivElement | null>(null);

  const loadLiveTelemetry = useCallback(async (forceRefresh = false) => {
    setIsRefreshing(true);
    setRefreshError(null);
    try {
      const liveData = await fetchGitHubDashboardData(forceRefresh);
      setData(liveData);
    } catch {
      setRefreshError('Showing verified repository snapshot.');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadLiveTelemetry(false);
  }, [loadLiveTelemetry]);

  useEffect(() => {
    if (!heroRef.current) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const items = heroRef.current.querySelectorAll('.gh-reveal-item');
    gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.05,
      }
    );
  }, []);

  const contributionWeeks = useMemo(() => {
    const weeks: ContributionDay[][] = [];
    const days = data.contributions;
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  }, [data.contributions]);

  const monthMarkers = useMemo(() => {
    const markers: Array<{ label: string; colIndex: number }> = [];
    let lastMonth = -1;
    contributionWeeks.forEach((week, idx) => {
      const firstDay = week[0];
      if (!firstDay) return;
      const m = Number(firstDay.date.slice(5, 7)) - 1;
      if (m !== lastMonth) {
        markers.push({ label: MONTHS[m] || '', colIndex: idx });
        lastMonth = m;
      }
    });
    return markers;
  }, [contributionWeeks]);

  const activeDayReadout = useMemo(() => {
    if (selectedDay) {
      const d = new Date(selectedDay.date);
      const formatted = d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      });
      return `${selectedDay.count} ${
        selectedDay.count === 1 ? 'contribution' : 'contributions'
      } on ${formatted}`;
    }
    const nonZeroDays = data.contributions.filter((d) => d.count > 0);
    const latestActive = nonZeroDays[nonZeroDays.length - 1];
    if (latestActive) {
      return `Latest: ${latestActive.count} ${
        latestActive.count === 1 ? 'contribution' : 'contributions'
      } on ${latestActive.date}`;
    }
    return `${data.totalContributionsLastYear} total contributions in the past year`;
  }, [data.contributions, data.totalContributionsLastYear, selectedDay]);

  const filteredEvents = useMemo(() => {
    return data.events.filter((ev) => {
      // Exclude WatchEvent (starred repos) completely from latest activity
      if (ev.type === 'WatchEvent') return false;

      if (activeTab === 'commits') {
        // Commits tab: only show commit & push events
        return ev.type === 'PushEvent' || ev.type === 'CommitEvent';
      }
      if (activeTab === 'code') {
        // Code & Forks tab: show repository forks and creations
        return ev.type === 'ForkEvent' || ev.type === 'CreateEvent';
      }
      // 'all' tab: all real development events
      return true;
    });
  }, [data.events, activeTab]);

  const availableLanguages = useMemo(() => {
    const set = new Set<string>(['All']);
    data.repositories.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return Array.from(set);
  }, [data.repositories]);

  const filteredRepositories = useMemo(() => {
    const q = repoQuery.trim().toLowerCase();

    // 1. Choose base repository pool by activeTab
    let baseList: GitHubRepository[] = [];
    if (activeTab === 'commits') {
      const activeCommitRepos = new Set([
        'sutannn13/templatebsi-fork',
        'templatebsi-fork',
        'sutannn13/mau-s-kitchen',
        'mau-s-kitchen',
        'sutannn13/press-release-auto-generate',
        'press-release-auto-generate',
        'sutannn13/bot-discord-2',
        'bot-discord-2',
        'sutannn13/skillmatch.ai',
        'skillmatch.ai',
      ]);
      baseList = data.repositories.filter(
        (r) =>
          activeCommitRepos.has(r.fullName.toLowerCase()) ||
          activeCommitRepos.has(r.name.toLowerCase()) ||
          !r.isFork
      );
    } else {
      // 'all' and 'code' tab: all repositories
      baseList = data.repositories;
    }

    // 2. Filter by search query and language
    return baseList.filter((r) => {
      const matchesLang = langFilter === 'All' || r.language === langFilter;
      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q)) ||
        (r.language && r.language.toLowerCase().includes(q)) ||
        r.fullName.toLowerCase().includes(q);
      return matchesLang && matchesQuery;
    });
  }, [activeTab, data.repositories, langFilter, repoQuery]);

  const currentlyBuilding = useMemo(() => {
    return data.repositories.slice(0, 3);
  }, [data.repositories]);

  const handleBackToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerPagePull('/', 'back', 'PORTFOLIO SHOWCASE');
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-clip bg-[#070707] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-12vw] h-[44vw] w-[76vw] -translate-x-1/2 rounded-full opacity-35 blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, rgba(241,107,13,0.42) 0%, rgba(230,20,22,0.14) 48%, rgba(7,7,7,0) 75%)',
        }}
      />

      <header className="sticky top-0 z-50 flex w-screen items-center justify-between border-b border-white/10 bg-[#070707]/80 px-[4vw] py-4 backdrop-blur-xl max-[1025px]:px-[5vw]">
        <a
          href="/"
          onClick={handleBackToPortfolio}
          className="group flex items-center gap-3 text-white no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16B0D]"
        >
          <Image
            src="/johann.svg"
            width={338}
            height={172}
            alt="Johann Logo"
            className="w-[10vw] max-[1025px]:w-[22vw] max-md:w-[28vw]"
          />
        </a>

        <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 md:flex">
          <span
            className={`h-2 w-2 rounded-full ${
              isRefreshing
                ? 'animate-ping bg-[#F16B0D]'
                : data.isLive
                ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                : 'bg-[#F16B0D]'
            }`}
          />
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/70">
            {isRefreshing
              ? 'Syncing GitHub API...'
              : data.isLive
              ? `Live API Synced // @${data.profile.login}`
              : `Verified Snapshot // @${data.profile.login}`}
          </span>
          <button
            type="button"
            onClick={() => loadLiveTelemetry(true)}
            disabled={isRefreshing}
            className="ml-2 cursor-pointer rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[11px] text-white transition-colors hover:bg-[#F16B0D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16B0D] disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        <div className="flex items-center gap-3">
          <HoldChargeButton
            size="compact"
            label="Back to Portfolio"
            holdMs={2000}
            disabled={isPulling}
            allowQuickClick
            ariaLabel="Return to portfolio"
            onComplete={() => triggerPagePull('/', 'back', 'PORTFOLIO SHOWCASE')}
          />
        </div>
      </header>

      <main ref={heroRef} className="relative z-10 w-screen px-[4vw] pt-[5vw] max-[1025px]:px-[5vw] max-md:pt-10">
        <section aria-labelledby="activity-page-heading" className="pb-[5vw] max-md:pb-12">
          <div className="gh-reveal-item mb-4 inline-flex items-center gap-2.5 rounded-full bg-white/[0.05] px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#F16B0D]" />
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-white/75">
              GitHub // Live Activity
            </span>
          </div>

          <div className="grid grid-cols-1 items-end justify-between gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Copy stagger={0.015}>
                <h1
                  id="activity-page-heading"
                  className="text-[5.6vw] leading-[1.16] pb-1 font-normal tracking-tight text-white max-[1025px]:text-[7vw] max-md:text-[9.5vw]"
                >
                  Live Developer
                  <br />
                  Activity
                </h1>
              </Copy>
            </div>
            <div className="gh-reveal-item lg:col-span-4">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={data.profile.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex h-11 items-center gap-2.5 rounded-full
                    bg-white px-5 text-sm font-medium text-[#0a0a0a] no-underline
                    transition-colors hover:bg-[#F16B0D] hover:text-white
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16B0D]
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                  </svg>
                  <span>Open @{data.profile.login} on GitHub</span>
                </a>
                <button
                  type="button"
                  onClick={() => loadLiveTelemetry(true)}
                  className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 font-mono text-xs text-white/75 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16B0D] md:hidden"
                >
                  <span>{isRefreshing ? 'Syncing...' : 'Refresh Feed'}</span>
                </button>
              </div>
            </div>
          </div>

          {refreshError && (
            <p role="status" className="mt-4 font-mono text-xs text-[#ff9852]">
              Note: {refreshError}
            </p>
          )}

          <div className="mt-[4vw] relative h-px w-full max-md:mt-8">
            <StringLine strokeColor="rgba(255, 255, 255, 0.35)" strokeWidth={1} />
          </div>

          <div className="gh-reveal-item mt-[3vw] grid grid-cols-1 gap-8 rounded-[28px] border border-white/8 bg-[#0d0d10] p-[2.6vw] lg:grid-cols-12 max-[1025px]:p-7 max-md:mt-6 max-md:p-5">
            <div className="flex flex-col justify-between gap-6 lg:col-span-5 lg:border-r lg:border-white/10 lg:pr-8">
              <div className="flex items-start gap-4">
                <img
                  src={data.profile.avatarUrl}
                  alt={data.profile.name}
                  width={72}
                  height={72}
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-2 ring-[#F16B0D]/50"
                />
                <div>
                  <h2 className="text-xl font-medium text-white sm:text-2xl">
                    {data.profile.name}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs text-white/55">
                    <a
                      href={data.profile.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F16B0D] underline-offset-4 hover:underline"
                    >
                      @{data.profile.login}
                    </a>
                    {data.profile.company && (
                      <>
                        <span>{'//'}</span>
                        <span>{data.profile.company}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-white/70">{data.profile.bio}</p>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-white/50">
                <span>Latest Pushed Repo</span>
                {currentlyBuilding[0] ? (
                  <a
                    href={currentlyBuilding[0].htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#F16B0D]"
                  >
                    {currentlyBuilding[0].name} ({formatRelativeTime(currentlyBuilding[0].pushedAt)})
                  </a>
                ) : (
                  <span>Active</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-7 lg:items-center lg:pl-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                  Repositories
                </p>
                <p className="mt-2 text-[3.4vw] font-normal leading-none tracking-tight text-white max-[1025px]:text-4xl">
                  {data.profile.publicRepos}
                </p>
                <p className="mt-2 font-mono text-[11px] text-white/40">Public owned</p>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                  Contributions
                </p>
                <p className="mt-2 text-[3.4vw] font-normal leading-none tracking-tight text-[#F16B0D] max-[1025px]:text-4xl">
                  {data.totalContributionsLastYear}
                </p>
                <p className="mt-2 font-mono text-[11px] text-white/40">Past 12 months</p>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                  Total Stars
                </p>
                <p className="mt-2 text-[3.4vw] font-normal leading-none tracking-tight text-white max-[1025px]:text-4xl">
                  {data.totalStars}
                </p>
                <p className="mt-2 font-mono text-[11px] text-white/40">Community stars</p>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                  Followers
                </p>
                <p className="mt-2 text-[3.4vw] font-normal leading-none tracking-tight text-white max-[1025px]:text-4xl">
                  {data.profile.followers}
                </p>
                <p className="mt-2 font-mono text-[11px] text-white/40">
                  {data.totalForks} forks across repos
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="contribution-matrix-heading" className="py-[4vw] max-md:py-10">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.26em] text-white/40">
                Annual Commit Density
              </p>
              <h2
                id="contribution-matrix-heading"
                className="mt-1 text-[2.4vw] font-normal tracking-tight text-white max-[1025px]:text-3xl max-md:text-2xl"
              >
                52-Week Contribution Matrix
              </h2>
            </div>

            <div
              aria-live="polite"
              className="rounded-full bg-white/[0.04] px-4 py-2 font-mono text-xs text-[#ff9852]"
            >
              {activeDayReadout}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/8 bg-[#0d0d10] p-[2.4vw] max-[1025px]:p-6 max-md:p-4">
            <div className="overflow-x-auto pb-2" data-lenis-prevent-horizontal>
              <div className="min-w-[740px]">
                <div
                  className="mb-2 grid font-mono text-[11px] text-white/40"
                  style={{
                    gridTemplateColumns: `repeat(${contributionWeeks.length}, minmax(0, 1fr))`,
                  }}
                >
                  {contributionWeeks.map((_, colIdx) => {
                    const marker = monthMarkers.find((m) => m.colIndex === colIdx);
                    return <span key={colIdx}>{marker ? marker.label : ''}</span>;
                  })}
                </div>

                <div
                  className="grid gap-[4px]"
                  style={{
                    gridTemplateColumns: `repeat(${contributionWeeks.length}, minmax(0, 1fr))`,
                  }}
                >
                  {contributionWeeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[4px]">
                      {week.map((day) => {
                        const cellColor =
                          day.level === 0
                            ? 'bg-white/[0.05] hover:bg-white/[0.15]'
                            : day.level === 1
                            ? 'bg-[#F16B0D]/30 hover:bg-[#F16B0D]/55'
                            : day.level === 2
                            ? 'bg-[#F16B0D]/55 hover:bg-[#F16B0D]/80'
                            : day.level === 3
                            ? 'bg-[#F16B0D]/80 hover:bg-[#F16B0D]'
                            : 'bg-[#F16B0D] shadow-[0_0_8px_rgba(241,107,13,0.6)]';
                        return (
                          <button
                            key={day.date}
                            type="button"
                            aria-label={`${day.count} contributions on ${day.date}`}
                            onMouseEnter={() => setSelectedDay(day)}
                            onFocus={() => setSelectedDay(day)}
                            onClick={() => setSelectedDay(day)}
                            className={`aspect-square w-full cursor-pointer rounded-[3px] transition-transform duration-150 hover:scale-125 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${cellColor}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col justify-between gap-6 border-t border-white/10 pt-6 lg:flex-row lg:items-center">
              <div className="flex items-center gap-2 font-mono text-xs text-white/45">
                <span>Less</span>
                <span className="h-3 w-3 rounded-[3px] bg-white/[0.05]" />
                <span className="h-3 w-3 rounded-[3px] bg-[#F16B0D]/30" />
                <span className="h-3 w-3 rounded-[3px] bg-[#F16B0D]/55" />
                <span className="h-3 w-3 rounded-[3px] bg-[#F16B0D]/80" />
                <span className="h-3 w-3 rounded-[3px] bg-[#F16B0D]" />
                <span>More</span>
              </div>

              <div className="flex flex-1 flex-col gap-2.5 lg:max-w-xl">
                <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/5">
                  {data.languages.map((lang) => (
                    <div
                      key={lang.language}
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color,
                      }}
                      title={`${lang.language}: ${lang.percentage}%`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-xs text-white/65">
                  {data.languages.map((lang) => (
                    <span key={lang.language} className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-white">{lang.language}</span>
                      <span className="text-white/40">{lang.percentage}%</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="currently-building-heading" className="py-[4vw] max-md:py-10">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.26em] text-white/40">
                Active Work
              </p>
              <h2
                id="currently-building-heading"
                className="mt-1 text-[2.4vw] font-normal tracking-tight text-white max-[1025px]:text-3xl max-md:text-2xl"
              >
                Currently Building
              </h2>
            </div>
            <p className="font-mono text-xs text-white/45">
              Top 3 most recently pushed repositories
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {currentlyBuilding.map((repo, idx) => (
              <a
                key={repo.id}
                href={repo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group relative flex flex-col justify-between rounded-[26px]
                  border border-white/8 bg-[#0d0d10] p-7 text-white no-underline
                  transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F16B0D]/40
                  hover:bg-[#131318] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16B0D]
                "
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-white/30">0{idx + 1}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F16B0D]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#ff9852]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F16B0D]" />
                      In Progress
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-normal tracking-tight text-white transition-colors group-hover:text-[#F16B0D]">
                    {repo.name}
                  </h3>

                  {repo.description && (
                    <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-white/55">
                      {repo.description}
                    </p>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-white/50">
                  <span>{repo.language || 'Multi-stack'}</span>
                  <span>Pushed {formatRelativeTime(repo.pushedAt)}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="py-[4vw] pb-[6vw] max-md:py-10">
          <div className="grid grid-cols-1 gap-[4vw] lg:grid-cols-12 max-md:gap-12">
            <div className="lg:col-span-5">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.26em] text-white/40">
                    Activity Log
                  </p>
                  <h2 className="mt-1 text-[2.2vw] font-normal tracking-tight text-white max-[1025px]:text-3xl max-md:text-2xl">
                    Latest Activity
                  </h2>
                </div>

                <SegmentedControl
                  tabs={REPO_TABS}
                  activeTab={activeTab}
                  onChange={(tabId) => setActiveTab(tabId)}
                  ariaLabel="Filter GitHub activity and repositories"
                />
              </div>

              <div className="rounded-[28px] bg-[#0d0d10] p-6 max-md:p-4">
                <div key={activeTab} className="tab-content-enter">
                  {filteredEvents.length === 0 ? (
                    <div className="py-12 text-center">
                      <p className="text-sm text-white/60">
                        {activeTab === 'commits'
                          ? 'No commit history records found in this view.'
                          : 'No recent events in this filter category.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('all')}
                        className="mt-3 cursor-pointer rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs text-white hover:bg-[#F16B0D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16B0D]"
                      >
                        Show All
                      </button>
                    </div>
                  ) : (
                    <ul className="divide-y divide-white/8">
                      {filteredEvents.map((ev) => (
                        <li key={ev.id} className="py-3.5 first:pt-1 last:pb-1">
                          <a
                            href={ev.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gh-row group flex items-start justify-between gap-4 no-underline focus-visible:outline-none"
                          >
                            <div className="flex items-start gap-3.5 min-w-0">
                              <span
                                aria-hidden="true"
                                className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.05] font-mono text-xs text-[#F16B0D] transition-colors group-hover:bg-[#F16B0D] group-hover:text-white"
                              >
                                {ev.type === 'ForkEvent' ? (
                                  '⑂'
                                ) : ev.type === 'PushEvent' || ev.type === 'CommitEvent' ? (
                                  <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <circle cx="8" cy="8" r="3" />
                                    <line x1="8" y1="1" x2="8" y2="5" />
                                    <line x1="8" y1="11" x2="8" y2="15" />
                                  </svg>
                                ) : (
                                  '↗'
                                )}
                              </span>
                              <div className="min-w-0">
                                <p className="text-sm text-white/90 transition-colors group-hover:text-[#F16B0D] truncate">
                                  <span className="text-white/55">{ev.action}</span>{' '}
                                  <span className="font-medium text-white group-hover:text-[#F16B0D]">
                                    {ev.repoName}
                                  </span>
                                </p>
                                {ev.detail && (
                                  <p className="mt-0.5 flex flex-wrap items-center gap-1.5 font-mono text-xs text-white/50">
                                    {ev.sha && (
                                      <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10.5px] text-[#F16B0D] shrink-0">
                                        {ev.sha}
                                      </span>
                                    )}
                                    <span className="line-clamp-1">{ev.detail}</span>
                                  </p>
                                )}
                              </div>
                            </div>

                            <span className="shrink-0 font-mono text-[11px] text-white/40">
                              {formatRelativeTime(ev.createdAt)}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.26em] text-white/40">
                    Repositories
                  </p>
                  <h2 className="mt-1 text-[2.2vw] font-normal tracking-tight text-white max-[1025px]:text-3xl max-md:text-2xl">
                    {activeTab === 'commits'
                      ? 'Active Contributor Repositories'
                      : activeTab === 'code'
                      ? 'Code & Fork Repositories'
                      : 'Active Repositories'}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="search"
                    value={repoQuery}
                    onChange={(e) => setRepoQuery(e.target.value)}
                    placeholder="Filter repositories..."
                    aria-label="Filter repositories by name or description"
                    className="h-9 rounded-full border border-white/15 bg-white/[0.04] px-4 text-xs text-white placeholder-white/35 focus:border-[#F16B0D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-1.5">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLangFilter(lang)}
                    className={`cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16B0D] ${
                      langFilter === lang
                        ? 'bg-white text-[#0a0a0a]'
                        : 'bg-white/[0.04] text-white/60 hover:bg-white/[0.1] hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <div className="relative h-px w-full">
                <StringLine strokeColor="rgba(255, 255, 255, 0.35)" strokeWidth={1} />
              </div>

              <div key={activeTab} className="tab-content-enter">
                {filteredRepositories.length === 0 ? (
                  <div className="py-14 text-center">
                    <p className="text-base text-white/65">
                      No repositories match &ldquo;{repoQuery}&rdquo; in {langFilter}.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setRepoQuery('');
                        setLangFilter('All');
                        setActiveTab('all');
                      }}
                      className="mt-4 cursor-pointer rounded-full bg-[#F16B0D] px-5 py-2 text-xs font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16B0D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707]"
                    >
                      Reset Repository Filters
                    </button>
                  </div>
                ) : (
                  <div>
                    {filteredRepositories.slice(0, 10).map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gh-row group flex flex-col justify-between gap-3 border-b border-white/8 py-5 text-white no-underline transition-colors focus-visible:outline-none sm:flex-row sm:items-center"
                      >
                        <div className="max-w-xl">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-normal tracking-tight text-white transition-colors group-hover:text-[#F16B0D] sm:text-2xl">
                              {repo.name}
                            </h3>
                            {repo.stars > 0 && (
                              <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 font-mono text-xs text-[#F16B0D]">
                                ★ {repo.stars}
                              </span>
                            )}
                            {repo.forks > 0 && (
                              <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 font-mono text-xs text-white/60">
                                ⑂ {repo.forks}
                              </span>
                            )}
                            {repo.isFork && (
                              <span className="rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/50">
                                Fork
                              </span>
                            )}
                          </div>
                          {repo.description && (
                            <p className="mt-1.5 line-clamp-1 text-sm text-white/55">
                              {repo.description}
                            </p>
                          )}
                        </div>

                        <div className="flex shrink-0 items-center gap-4 font-mono text-xs text-white/50">
                          {repo.language && (
                            <span className="rounded-full bg-white/[0.04] px-3 py-1 text-white/80">
                              {repo.language}
                            </span>
                          )}
                          <span>{formatRelativeTime(repo.pushedAt)}</span>
                          <span
                            aria-hidden="true"
                            className="inline-block text-white/35 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#F16B0D]"
                          >
                            &rarr;
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-[4vw] flex flex-col items-center justify-between gap-6 rounded-[28px] border border-white/10 bg-[#0d0d10] p-[2.6vw] sm:flex-row max-[1025px]:p-7 max-md:mt-8 max-md:p-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#F16B0D]">
                Navigation // Return
              </p>
              <p className="mt-1.5 text-xl font-normal tracking-tight text-white sm:text-2xl">
                Ready to return to the main portfolio showcase?
              </p>
            </div>
            <HoldChargeButton
              size="compact"
              label="Back to Portfolio"
              holdMs={2000}
              disabled={isPulling}
              allowQuickClick
              ariaLabel="Return to main portfolio"
              onComplete={() => triggerPagePull('/', 'back', 'PORTFOLIO SHOWCASE')}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
