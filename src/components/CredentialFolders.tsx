'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IconFolder } from '@/components/ui/icon-folder';
import { CERTS, TECH_GROUPS } from '@/content/credentials';
import {
  CERTIFICATE_FOLDER_ICONS,
  CERTIFICATE_TAGS,
  TECH_STACK_FOLDER_ICONS,
  TECH_STACK_TAGS,
} from '@/content/folder-data';

type FolderKey = 'certs' | 'stack' | null;

export default function CredentialFolders() {
  const [open, setOpen] = useState<FolderKey>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const toggle = (key: Exclude<FolderKey, null>) =>
    setOpen((current) => (current === key ? null : key));

  return (
    <section id="credentials" className="relative w-screen bg-[#070707] pb-[7vw] text-white max-md:pb-[14vw]">
      <div className="w-screen px-[4vw] max-[1025px]:px-[5vw]">
        <div className="mb-[2vw] flex flex-col items-start gap-1">
          <p className="text-[1vw] uppercase tracking-[0.3em] text-white/40 max-[1025px]:text-[1.6vw] max-md:text-[3vw]">
            Interactive Showcase
          </p>
          <h2 className="text-[2.2vw] font-normal leading-tight tracking-tight text-white max-[1025px]:text-[3.2vw] max-md:text-[5.4vw]">
            Artifacts & Tech Folders
          </h2>
        </div>

        <div className="grid gap-10 pt-[2vw] md:grid-cols-2 md:justify-items-center md:gap-14 lg:gap-24 max-md:pt-[6vw]">
          <div className="flex w-full max-w-[420px] flex-col items-center">
            <IconFolder
              title="Certificates"
              tags={CERTIFICATE_TAGS}
              icons={CERTIFICATE_FOLDER_ICONS}
              theme="dark"
              spread={38}
              showPill={true}
              open={open === 'certs'}
              onOpenChange={(isOpen) => setOpen(isOpen ? 'certs' : null)}
            />
            <button
              type="button"
              onClick={() => toggle('certs')}
              className="mt-3.5 inline-flex items-center gap-2 rounded-full border-none bg-white/[0.04] px-3.5 py-1 text-xs text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <span>{open === 'certs' ? 'Close file details' : 'View certificate files'}</span>
              <span className="font-mono text-[10px] text-white/30">({CERTS.length} items)</span>
            </button>
          </div>

          <div className="flex w-full max-w-[420px] flex-col items-center">
            <IconFolder
              title="Tech Stack & AI"
              tags={TECH_STACK_TAGS}
              icons={TECH_STACK_FOLDER_ICONS}
              theme="dark"
              spread={38}
              showPill={true}
              open={open === 'stack'}
              onOpenChange={(isOpen) => setOpen(isOpen ? 'stack' : null)}
            />
            <button
              type="button"
              onClick={() => toggle('stack')}
              className="mt-3.5 inline-flex items-center gap-2 rounded-full border-none bg-white/[0.04] px-3.5 py-1 text-xs text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <span>{open === 'stack' ? 'Close stack overview' : 'View full tech breakdown'}</span>
              <span className="font-mono text-[10px] text-white/30">
                ({TECH_GROUPS.reduce((acc, g) => acc + g.items.length, 0)} tools)
              </span>
            </button>
          </div>
        </div>

        {open === 'certs' && (
          <div
            id="folder-panel-certs"
            role="region"
            aria-label="Certificates"
            className="folder-panel mt-[3.5vw] rounded-[28px] border-none bg-white/[0.02] p-[2vw] max-md:mt-[8vw] max-md:p-[6vw]"
          >
            <PanelHeader title="Certificates & awards" onClose={() => setOpen(null)} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CERTS.map((cert) => (
                <figure
                  key={cert.title}
                  className="overflow-hidden rounded-2xl border-none bg-[#0e0e0e]"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={cert.imgSrc}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className={cert.fit === 'contain' ? 'object-contain p-4' : 'object-cover'}
                    />
                  </div>
                  <figcaption className="p-4">
                    <p className="text-sm leading-snug text-white">{cert.title}</p>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-white/45">
                      {cert.meta}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {open === 'stack' && (
          <div
            id="folder-panel-stack"
            role="region"
            aria-label="Tech stack"
            className="folder-panel mt-[3.5vw] rounded-[28px] border-none bg-white/[0.02] p-[2vw] max-md:mt-[8vw] max-md:p-[6vw]"
          >
            <PanelHeader title="Tech stack" onClose={() => setOpen(null)} />
            <div className="grid gap-[3vw] md:grid-cols-2 max-md:gap-[6vw]">
              {TECH_GROUPS.map((group) => (
                <div key={group.label}>
                  <h3 className="mb-4 font-mono text-[0.8vw] uppercase tracking-[0.2em] text-white/40 max-[1025px]:text-[1.4vw] max-md:text-[2.8vw]">
                    {group.label}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border-none bg-white/[0.06] px-3.5 py-1.5 text-[0.9vw] text-white/80 transition-colors hover:bg-white/[0.12] hover:text-white max-[1025px]:text-[1.6vw] max-md:text-[3.2vw]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PanelHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h2 className="text-[1.6vw] text-white max-[1025px]:text-[2.6vw] max-md:text-[4.6vw]">{title}</h2>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close folder"
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
