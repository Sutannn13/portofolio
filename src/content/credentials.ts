export interface Certification {
  title: string;
  meta: string;
  imgSrc: string;
  fit?: 'cover' | 'contain';
}

export const CERTS: Certification[] = [
  {
    title: 'Juara 2 - IT Bootcamp UBSI Jabar',
    meta: '2025 - SOFTWARE DEVELOPMENT (TRASH POINT)',
    imgSrc: '/certificates/juara-2-it-bootcamp.jpg',
    fit: 'cover',
  },
  {
    title: 'HKI - Surat Pencatatan Ciptaan',
    meta: '2025 - KEMENKUMHAM RI (NO. 000946578)',
    imgSrc: '/certificates/hki-surat-pencatatan-ciptaan.jpg',
    fit: 'contain',
  },
  {
    title: 'MTCNA - MikroTik Certified Associate',
    meta: '2026 - MIKROTIK ACADEMY (2601NA9594)',
    imgSrc: '/certificates/mtcna-mikrotik.jpg',
    fit: 'contain',
  },
  {
    title: 'Cisco - Introduction to Cybersecurity',
    meta: '2025 - CISCO NETWORKING ACADEMY',
    imgSrc: '/certificates/cisco-cybersecurity.jpg',
    fit: 'contain',
  },
  {
    title: 'Dealls - IT Project & Mentoring',
    meta: '2025 - DEALLS JOBS & MENTORING',
    imgSrc: '/certificates/dealls-mentoring.jpg',
    fit: 'contain',
  },
  {
    title: 'PCAP - Programming Essentials in Python',
    meta: '2024 - CISCO NETACAD & UBSI',
    imgSrc: '/certificates/pcap-python-ubsi.jpg',
    fit: 'contain',
  },
];

export const TECH_GROUPS = [
  {
    label: 'Full-Stack & Cloud',
    items: ['PHP', 'Laravel', 'Next.js', 'Vue.js', 'Cloudflare'],
  },
  {
    label: 'Database & AI Tooling',
    items: ['PostgreSQL', 'MySQL', 'Antigravity', 'OpenCode', '9Router'],
  },
];


export const TECH_FAN = ['PHP', 'LAR', 'NXT', 'VUE', 'JS', 'TS', 'CF', 'AI'];

export const CERT_FAN = ['MTC', 'HKI', 'CIS'];
