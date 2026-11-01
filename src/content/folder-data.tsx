import * as React from "react";
import type { FolderIcon } from "@/components/ui/icon-folder";
import { CERTS } from "./credentials";

/* ------------------------------------------------------------------ */
/*  Certificates Folder Icons (real image certificates from sutan.dev) */
/* ------------------------------------------------------------------ */

export const CERTIFICATE_FOLDER_ICONS: FolderIcon[] = CERTS.slice(0, 5).map((cert) => ({
  src: cert.imgSrc,
  label: cert.title.split(" - ")[0],
  background: "#121212",
  fit: "cover",
}));

export const CERTIFICATE_TAGS = [
  "Juara 2 IT",
  "HKI Ciptaan",
  "MTCNA",
  "Cisco Cyber",
  "Python PCAP",
];

/* ------------------------------------------------------------------ */
/*  Tech Stack & AI Icons (100% Real Image Assets from public/tech-icons) */
/* ------------------------------------------------------------------ */

export const TECH_STACK_FOLDER_ICONS: FolderIcon[] = [
  {
    src: "/tech-icons/laravel.svg",
    label: "Laravel",
    background: "#1c0d0d",
    fit: "contain",
  },
  {
    src: "/tech-icons/nextjs.svg",
    label: "Next.js",
    background: "#09090b",
    fit: "contain",
  },
  {
    src: "/tech-icons/postgresql.svg",
    label: "PostgreSQL",
    background: "#0c1b2a",
    fit: "contain",
  },
  {
    src: "/tech-icons/cloudflare.png",
    label: "Cloudflare",
    background: "#1a120a",
    fit: "contain",
  },
  {
    src: "/tech-icons/antigravity.png",
    label: "Antigravity AI",
    background: "#111428",
    fit: "contain",
  },
];

export const TECH_STACK_TAGS = [
  "PHP",
  "Laravel",
  "Next.js",
  "Vue.js",
  "PostgreSQL",
  "MySQL",
  "Cloudflare",
  "Antigravity",
  "OpenCode",
  "9Router",
];


