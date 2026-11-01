export interface GitHubUserProfile {
  login: string;
  name: string;
  avatarUrl: string;
  htmlUrl: string;
  bio: string;
  company: string | null;
  blog: string | null;
  publicRepos: number;
  followers: number;
  following: number;
}

export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
  updatedAt: string;
  htmlUrl: string;
  homepage: string | null;
  topics: string[];
  isFork: boolean;
}

export interface GitHubActivityEvent {
  id: string;
  type: string;
  action: string;
  repoName: string;
  repoUrl: string;
  detail: string | null;
  createdAt: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface LanguageShare {
  language: string;
  count: number;
  percentage: number;
  color: string;
}

export interface GitHubDashboardData {
  profile: GitHubUserProfile;
  totalStars: number;
  totalForks: number;
  totalContributionsLastYear: number;
  repositories: GitHubRepository[];
  events: GitHubActivityEvent[];
  contributions: ContributionDay[];
  languages: LanguageShare[];
  syncedAt: string;
  isLive: boolean;
}

export const GITHUB_USERNAME = 'Sutannn13';

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#F16B0D',
  JavaScript: '#F59E0B',
  CSS: '#FB923C',
  Blade: '#EA580C',
  PHP: '#D97706',
  Python: '#FBBF24',
  HTML: '#E61416',
  Other: '#71717A',
};

const VERIFIED_NON_ZERO_CONTRIBUTIONS: Record<string, [number, number]> = {
  "2026-01-07": [
    3,
    1
  ],
  "2026-02-13": [
    1,
    1
  ],
  "2026-02-14": [
    2,
    1
  ],
  "2026-02-15": [
    1,
    1
  ],
  "2026-02-16": [
    2,
    1
  ],
  "2026-02-17": [
    3,
    1
  ],
  "2026-02-19": [
    1,
    1
  ],
  "2026-02-20": [
    1,
    1
  ],
  "2026-02-23": [
    4,
    1
  ],
  "2026-02-24": [
    7,
    2
  ],
  "2026-02-26": [
    4,
    1
  ],
  "2026-02-27": [
    4,
    1
  ],
  "2026-03-01": [
    1,
    1
  ],
  "2026-03-02": [
    1,
    1
  ],
  "2026-03-03": [
    18,
    4
  ],
  "2026-03-04": [
    16,
    3
  ],
  "2026-03-07": [
    10,
    2
  ],
  "2026-03-08": [
    3,
    1
  ],
  "2026-03-09": [
    6,
    2
  ],
  "2026-03-10": [
    1,
    1
  ],
  "2026-03-11": [
    5,
    1
  ],
  "2026-03-12": [
    6,
    2
  ],
  "2026-03-14": [
    6,
    2
  ],
  "2026-03-15": [
    9,
    2
  ],
  "2026-03-17": [
    1,
    1
  ],
  "2026-03-27": [
    2,
    1
  ],
  "2026-03-28": [
    1,
    1
  ],
  "2026-03-30": [
    1,
    1
  ],
  "2026-03-31": [
    3,
    1
  ],
  "2026-04-01": [
    2,
    1
  ],
  "2026-04-03": [
    3,
    1
  ],
  "2026-04-05": [
    1,
    1
  ],
  "2026-04-06": [
    6,
    2
  ],
  "2026-04-07": [
    1,
    1
  ],
  "2026-04-09": [
    2,
    1
  ],
  "2026-04-10": [
    4,
    1
  ],
  "2026-04-11": [
    3,
    1
  ],
  "2026-04-12": [
    2,
    1
  ],
  "2026-04-13": [
    5,
    1
  ],
  "2026-04-14": [
    2,
    1
  ],
  "2026-04-16": [
    1,
    1
  ],
  "2026-04-17": [
    1,
    1
  ],
  "2026-04-18": [
    1,
    1
  ],
  "2026-04-19": [
    1,
    1
  ],
  "2026-04-20": [
    1,
    1
  ],
  "2026-04-23": [
    2,
    1
  ],
  "2026-04-25": [
    1,
    1
  ],
  "2026-04-26": [
    1,
    1
  ],
  "2026-04-27": [
    4,
    1
  ],
  "2026-04-28": [
    11,
    2
  ],
  "2026-04-29": [
    6,
    2
  ],
  "2026-05-01": [
    10,
    2
  ],
  "2026-05-02": [
    3,
    1
  ],
  "2026-05-03": [
    6,
    2
  ],
  "2026-05-04": [
    11,
    2
  ],
  "2026-05-05": [
    17,
    3
  ],
  "2026-05-06": [
    2,
    1
  ],
  "2026-05-07": [
    7,
    2
  ],
  "2026-05-08": [
    13,
    3
  ],
  "2026-05-10": [
    9,
    2
  ],
  "2026-05-11": [
    11,
    2
  ],
  "2026-05-12": [
    23,
    4
  ],
  "2026-05-13": [
    2,
    1
  ],
  "2026-05-14": [
    15,
    3
  ],
  "2026-05-15": [
    1,
    1
  ],
  "2026-05-16": [
    1,
    1
  ],
  "2026-05-17": [
    1,
    1
  ],
  "2026-05-22": [
    3,
    1
  ],
  "2026-05-27": [
    6,
    2
  ],
  "2026-05-28": [
    4,
    1
  ],
  "2026-05-29": [
    8,
    2
  ],
  "2026-05-30": [
    1,
    1
  ],
  "2026-05-31": [
    3,
    1
  ],
  "2026-06-01": [
    4,
    1
  ],
  "2026-06-02": [
    3,
    1
  ],
  "2026-06-04": [
    2,
    1
  ],
  "2026-06-06": [
    1,
    1
  ],
  "2026-06-09": [
    1,
    1
  ],
  "2026-06-10": [
    3,
    1
  ],
  "2026-06-11": [
    14,
    3
  ],
  "2026-06-12": [
    2,
    1
  ],
  "2026-06-13": [
    1,
    1
  ],
  "2026-06-15": [
    1,
    1
  ],
  "2026-06-19": [
    12,
    3
  ],
  "2026-06-20": [
    1,
    1
  ],
  "2026-06-21": [
    2,
    1
  ],
  "2026-06-24": [
    2,
    1
  ],
  "2026-06-25": [
    3,
    1
  ],
  "2026-06-26": [
    10,
    2
  ],
  "2026-06-28": [
    5,
    1
  ],
  "2026-06-29": [
    6,
    2
  ],
  "2026-06-30": [
    1,
    1
  ],
  "2026-07-03": [
    2,
    1
  ],
  "2026-07-05": [
    3,
    1
  ],
  "2026-07-07": [
    1,
    1
  ],
  "2026-07-11": [
    1,
    1
  ],
  "2026-07-16": [
    10,
    2
  ],
  "2026-08-01": [
    1,
    1
  ],
  "2026-08-02": [
    1,
    1
  ],
  "2026-08-16": [
    2,
    1
  ],
  "2026-08-18": [
    2,
    1
  ],
  "2026-08-19": [
    4,
    1
  ],
  "2026-08-29": [
    1,
    1
  ],
  "2026-08-30": [
    3,
    1
  ],
  "2026-08-31": [
    10,
    2
  ],
  "2026-09-01": [
    5,
    1
  ],
  "2026-09-02": [
    5,
    1
  ],
  "2026-09-03": [
    3,
    1
  ],
  "2026-09-04": [
    3,
    1
  ],
  "2026-09-05": [
    7,
    2
  ],
  "2026-09-07": [
    6,
    2
  ],
  "2026-09-08": [
    8,
    2
  ],
  "2026-09-12": [
    1,
    1
  ],
  "2026-09-18": [
    1,
    1
  ],
  "2026-09-19": [
    4,
    1
  ],
  "2026-09-21": [
    3,
    1
  ],
  "2026-10-08": [
    1,
    1
  ],
  "2026-10-11": [
    1,
    1
  ],
  "2026-10-12": [
    4,
    1
  ],
  "2026-10-14": [
    1,
    1
  ],
  "2026-10-16": [
    1,
    1
  ],
  "2026-10-20": [
    4,
    1
  ],
  "2026-10-21": [
    1,
    1
  ]
};

function buildFallbackContributions(): ContributionDay[] {
  const start = new Date('2025-11-02T00:00:00Z');
  const days: ContributionDay[] = [];
  for (let i = 0; i < 365; i++) {
    const d = new Date(start.getTime() + i * 86400000);
    const iso = d.toISOString().slice(0, 10);
    const entry = VERIFIED_NON_ZERO_CONTRIBUTIONS[iso];
    days.push({
      date: iso,
      count: entry ? entry[0] : 0,
      level: (entry ? entry[1] : 0) as 0 | 1 | 2 | 3 | 4,
    });
  }
  return days;
}

export const VERIFIED_GITHUB_FALLBACK: GitHubDashboardData = {
  profile: {
    login: "Sutannn13",
    name: "Sutan Arlie Johan",
    avatarUrl: "https://avatars.githubusercontent.com/u/201787510?v=4",
    htmlUrl: "https://github.com/Sutannn13",
    bio: "Aspiring Web Developer | Focusing on JavaScript, PHP (Laravel) & API Development. Currently building real-world applications and seeking internship opportunitie",
    company: "@universitasbinasaranainformatika",
    blog: "https://portofolio-johan-puce.vercel.app/",
    publicRepos: 30,
    followers: 14,
    following: 13,
  },
  totalStars: 23,
  totalForks: 2,
  totalContributionsLastYear: 515,
  repositories: [
  {
    "id": 1428263597,
    "name": "templatebsi-fork",
    "fullName": "Sutannn13/templatebsi-fork",
    "description": "Template penulisan naskah Proposal dan Laporan Praktik Kerja Lapangan (PKL) berbasis Typst untuk Program Studi Teknologi Informasi (S1), Fakultas Teknik & Informatika, Universitas Bina Sarana Informatika.",
    "language": null,
    "stars": 0,
    "forks": 0,
    "pushedAt": "2026-10-20T12:54:29Z",
    "updatedAt": "2026-10-21T11:07:33Z",
    "htmlUrl": "https://github.com/Sutannn13/templatebsi-fork",
    "homepage": null,
    "topics": [],
    "isFork": true
  },
  {
    "id": 1171783610,
    "name": "Sutannn13",
    "fullName": "Sutannn13/Sutannn13",
    "description": null,
    "language": "Python",
    "stars": 1,
    "forks": 0,
    "pushedAt": "2026-10-13T09:26:31Z",
    "updatedAt": "2026-10-13T09:26:34Z",
    "htmlUrl": "https://github.com/Sutannn13/Sutannn13",
    "homepage": null,
    "topics": [],
    "isFork": false
  },
  {
    "id": 1335679339,
    "name": "mau-s-kitchen",
    "fullName": "Sutannn13/mau-s-kitchen",
    "description": null,
    "language": "TypeScript",
    "stars": 1,
    "forks": 0,
    "pushedAt": "2026-09-11T19:17:52Z",
    "updatedAt": "2026-09-08T15:54:12Z",
    "htmlUrl": "https://github.com/Sutannn13/mau-s-kitchen",
    "homepage": null,
    "topics": [],
    "isFork": false
  },
  {
    "id": 1358353441,
    "name": "webproof",
    "fullName": "Sutannn13/webproof",
    "description": null,
    "language": null,
    "stars": 0,
    "forks": 0,
    "pushedAt": "2026-09-05T16:12:25Z",
    "updatedAt": "2026-09-05T16:12:25Z",
    "htmlUrl": "https://github.com/Sutannn13/webproof",
    "homepage": null,
    "topics": [],
    "isFork": false
  },
  {
    "id": 1352765762,
    "name": "jakarta-tech-expo",
    "fullName": "Sutannn13/jakarta-tech-expo",
    "description": null,
    "language": "HTML",
    "stars": 0,
    "forks": 0,
    "pushedAt": "2026-08-31T19:47:55Z",
    "updatedAt": "2026-08-31T19:49:12Z",
    "htmlUrl": "https://github.com/Sutannn13/jakarta-tech-expo",
    "homepage": null,
    "topics": [],
    "isFork": false
  },
  {
    "id": 1338111026,
    "name": "press-release-auto-generate",
    "fullName": "Sutannn13/press-release-auto-generate",
    "description": "this project for pres release auto generate",
    "language": "TypeScript",
    "stars": 1,
    "forks": 1,
    "pushedAt": "2026-08-19T07:46:23Z",
    "updatedAt": "2026-09-08T15:54:15Z",
    "htmlUrl": "https://github.com/Sutannn13/press-release-auto-generate",
    "homepage": null,
    "topics": [],
    "isFork": false
  },
  {
    "id": 1289943560,
    "name": "bot-discord-2",
    "fullName": "Sutannn13/bot-discord-2",
    "description": "bot buat server dc gw",
    "language": "JavaScript",
    "stars": 1,
    "forks": 0,
    "pushedAt": "2026-07-16T06:17:06Z",
    "updatedAt": "2026-07-16T06:17:11Z",
    "htmlUrl": "https://github.com/Sutannn13/bot-discord-2",
    "homepage": null,
    "topics": [],
    "isFork": false
  },
  {
    "id": 1251042858,
    "name": "Skill-Path-AI",
    "fullName": "Sutannn13/Skill-Path-AI",
    "description": "website for generate ur skill and make a profesional portofolio, also u can finf a job/intern. ",
    "language": "TypeScript",
    "stars": 3,
    "forks": 0,
    "pushedAt": "2026-07-16T04:31:30Z",
    "updatedAt": "2026-07-16T04:31:34Z",
    "htmlUrl": "https://github.com/Sutannn13/Skill-Path-AI",
    "homepage": "https://skill-path-ai-kappa.vercel.app",
    "topics": [],
    "isFork": false
  },
  {
    "id": 1265282277,
    "name": "PortofolioJohan",
    "fullName": "Sutannn13/PortofolioJohan",
    "description": "Personal portofolio Sutan Arlie Johan",
    "language": "TypeScript",
    "stars": 1,
    "forks": 0,
    "pushedAt": "2026-07-03T14:11:27Z",
    "updatedAt": "2026-07-03T14:11:31Z",
    "htmlUrl": "https://github.com/Sutannn13/PortofolioJohan",
    "homepage": "https://portofolio-johan-puce.vercel.app",
    "topics": [],
    "isFork": false
  },
  {
    "id": 1281040078,
    "name": "Let-s-AFK-Project",
    "fullName": "Sutannn13/Let-s-AFK-Project",
    "description": "let's afk project ",
    "language": "JavaScript",
    "stars": 1,
    "forks": 0,
    "pushedAt": "2026-06-26T13:41:47Z",
    "updatedAt": "2026-07-15T18:03:33Z",
    "htmlUrl": "https://github.com/Sutannn13/Let-s-AFK-Project",
    "homepage": "https://let-s-afk-project.vercel.app",
    "topics": [],
    "isFork": false
  },
  {
    "id": 1234824476,
    "name": "solar-system-ar",
    "fullName": "Sutannn13/solar-system-ar",
    "description": "Aplikasi Web Augmented Reality Tata Surya sebagai media pembelajaran interaktif menggunakan A-Frame dan AR.js.",
    "language": "TypeScript",
    "stars": 0,
    "forks": 1,
    "pushedAt": "2026-06-19T15:02:39Z",
    "updatedAt": "2026-06-19T15:02:49Z",
    "htmlUrl": "https://github.com/Sutannn13/solar-system-ar",
    "homepage": "https://solar-system-ar-sigma.vercel.app",
    "topics": [],
    "isFork": false
  },
  {
    "id": 1196386337,
    "name": "Clone-Porto-V2",
    "fullName": "Sutannn13/Clone-Porto-V2",
    "description": "porto clone v2",
    "language": "TypeScript",
    "stars": 1,
    "forks": 0,
    "pushedAt": "2026-06-10T16:24:45Z",
    "updatedAt": "2026-06-10T16:30:59Z",
    "htmlUrl": "https://github.com/Sutannn13/Clone-Porto-V2",
    "homepage": "https://sutan-portov2.vercel.app",
    "topics": [],
    "isFork": false
  },
  {
    "id": 1254526434,
    "name": "HMTI-MARGONDA",
    "fullName": "Sutannn13/HMTI-MARGONDA",
    "description": "Website Himpunan Mahasiswa Teknologi informasi UBSI Margonda",
    "language": "TypeScript",
    "stars": 0,
    "forks": 0,
    "pushedAt": "2026-06-01T12:22:56Z",
    "updatedAt": "2026-06-01T12:23:00Z",
    "htmlUrl": "https://github.com/Sutannn13/HMTI-MARGONDA",
    "homepage": null,
    "topics": [],
    "isFork": false
  },
  {
    "id": 1246494407,
    "name": "SKILLMATCH.AI",
    "fullName": "Sutannn13/SKILLMATCH.AI",
    "description": "Aplikasi  mencari lowongna magang dengan menyesuaikan skill pribadi, masukan repo&link Linkedin kamu agar AI bisa generate lowongan yang sesuai dengan kemampuan anda",
    "language": "TypeScript",
    "stars": 0,
    "forks": 0,
    "pushedAt": "2026-05-22T09:57:54Z",
    "updatedAt": "2026-05-22T09:58:04Z",
    "htmlUrl": "https://github.com/Sutannn13/SKILLMATCH.AI",
    "homepage": null,
    "topics": [],
    "isFork": false
  }
],
  events: [
  {
    "id": "18313667399",
    "type": "WatchEvent",
    "action": "Starred repository",
    "repoName": "Ebony-Vinyl/dsh-our-free-model",
    "repoUrl": "https://github.com/Ebony-Vinyl/dsh-our-free-model",
    "detail": null,
    "createdAt": "2026-10-27T06:32:35Z"
  },
  {
    "id": "18293321546",
    "type": "WatchEvent",
    "action": "Starred repository",
    "repoName": "JoasASantos/REA-Prompts",
    "repoUrl": "https://github.com/JoasASantos/REA-Prompts",
    "detail": null,
    "createdAt": "2026-10-27T00:33:22Z"
  },
  {
    "id": "18144551414",
    "type": "WatchEvent",
    "action": "Starred repository",
    "repoName": "itzluthfi/Farm-Acc-ChatGPT-K-12-Teachers",
    "repoUrl": "https://github.com/itzluthfi/Farm-Acc-ChatGPT-K-12-Teachers",
    "detail": null,
    "createdAt": "2026-10-25T07:11:14Z"
  },
  {
    "id": "17840494190",
    "type": "WatchEvent",
    "action": "Starred repository",
    "repoName": "togg53192-cmd/jailbreaks",
    "repoUrl": "https://github.com/togg53192-cmd/jailbreaks",
    "detail": null,
    "createdAt": "2026-10-21T17:43:02Z"
  },
  {
    "id": "17805237131",
    "type": "ForkEvent",
    "action": "Forked repository",
    "repoName": "fatidaprilian/templatebsi",
    "repoUrl": "https://github.com/fatidaprilian/templatebsi",
    "detail": "Sutannn13/templatebsi-fork",
    "createdAt": "2026-10-21T11:07:33Z"
  },
  {
    "id": "17699331907",
    "type": "WatchEvent",
    "action": "Starred repository",
    "repoName": "RudyCity/superagent",
    "repoUrl": "https://github.com/RudyCity/superagent",
    "detail": null,
    "createdAt": "2026-10-20T10:59:58Z"
  },
  {
    "id": "17483551713",
    "type": "WatchEvent",
    "action": "Starred repository",
    "repoName": "azrinaldi/gemini-stealth-bridge",
    "repoUrl": "https://github.com/azrinaldi/gemini-stealth-bridge",
    "detail": null,
    "createdAt": "2026-10-17T14:45:18Z"
  },
  {
    "id": "17288457707",
    "type": "WatchEvent",
    "action": "Starred repository",
    "repoName": "firecrawl/firecrawl",
    "repoUrl": "https://github.com/firecrawl/firecrawl",
    "detail": null,
    "createdAt": "2026-10-15T10:28:41Z"
  },
  {
    "id": "16698140970",
    "type": "WatchEvent",
    "action": "Starred repository",
    "repoName": "d4ncboz/museai",
    "repoUrl": "https://github.com/d4ncboz/museai",
    "detail": null,
    "createdAt": "2026-10-08T03:25:07Z"
  },
  {
    "id": "16608246388",
    "type": "WatchEvent",
    "action": "Starred repository",
    "repoName": "morluto/rea",
    "repoUrl": "https://github.com/morluto/rea",
    "detail": null,
    "createdAt": "2026-10-07T05:00:46Z"
  }
],
  contributions: buildFallbackContributions(),
  languages: [
    { language: 'TypeScript', count: 14, percentage: 54, color: LANGUAGE_COLORS.TypeScript },
    { language: 'JavaScript', count: 4, percentage: 15, color: LANGUAGE_COLORS.JavaScript },
    { language: 'CSS', count: 3, percentage: 12, color: LANGUAGE_COLORS.CSS },
    { language: 'Blade / PHP', count: 3, percentage: 11, color: LANGUAGE_COLORS.Blade },
    { language: 'Python', count: 1, percentage: 4, color: LANGUAGE_COLORS.Python },
    { language: 'HTML', count: 1, percentage: 4, color: LANGUAGE_COLORS.HTML },
  ],
  syncedAt: '2026-11-01T10:00:00.000Z',
  isLive: false,
};

export function formatRelativeTime(
  isoDate: string,
  referenceIso: string = '2026-11-01T10:00:00.000Z'
): string {
  const time = Date.parse(isoDate);
  const refTime = Date.parse(referenceIso);
  if (Number.isNaN(time) || Number.isNaN(refTime)) return 'recently';
  const diffSec = Math.max(1, Math.floor((refTime - time) / 1000));
  if (diffSec < 60) return 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  const diffWk = Math.floor(diffDay / 7);
  if (diffWk < 5) return `${diffWk}w ago`;
  const diffMo = Math.floor(diffDay / 30);
  if (diffMo < 12) return `${diffMo}mo ago`;
  const diffYr = Math.floor(diffDay / 365);
  return `${diffYr}y ago`;
}

interface RawGitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  updated_at: string;
  html_url: string;
  homepage: string | null;
  topics?: string[];
  fork?: boolean;
}

interface RawGitHubEvent {
  id: string;
  type: string;
  repo?: { name?: string };
  created_at: string;
  payload?: {
    action?: string;
    ref?: string;
    ref_type?: string;
    size?: number;
    commits?: Array<{ message?: string }>;
    forkee?: { full_name?: string };
    pull_request?: { title?: string };
  };
}

export async function fetchGitHubDashboardData(): Promise<GitHubDashboardData> {
  try {
    const [userRes, reposRes, eventsRes, contribRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { cache: 'no-store' }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100&type=owner`, { cache: 'no-store' }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`, { cache: 'no-store' }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`, { cache: 'no-store' }),
    ]);

    const userJson =
      userRes.status === 'fulfilled' && userRes.value.ok ? await userRes.value.json() : null;
    const reposJson: RawGitHubRepo[] | null =
      reposRes.status === 'fulfilled' && reposRes.value.ok ? await reposRes.value.json() : null;
    const eventsJson: RawGitHubEvent[] | null =
      eventsRes.status === 'fulfilled' && eventsRes.value.ok ? await eventsRes.value.json() : null;
    const contribJson =
      contribRes.status === 'fulfilled' && contribRes.value.ok ? await contribRes.value.json() : null;

    if (!userJson && !reposJson && !contribJson) {
      return VERIFIED_GITHUB_FALLBACK;
    }

    const profile: GitHubUserProfile = userJson
      ? {
          login: userJson.login || VERIFIED_GITHUB_FALLBACK.profile.login,
          name: userJson.name || VERIFIED_GITHUB_FALLBACK.profile.name,
          avatarUrl: userJson.avatar_url || VERIFIED_GITHUB_FALLBACK.profile.avatarUrl,
          htmlUrl: userJson.html_url || VERIFIED_GITHUB_FALLBACK.profile.htmlUrl,
          bio: (userJson.bio || VERIFIED_GITHUB_FALLBACK.profile.bio).trim(),
          company: userJson.company || VERIFIED_GITHUB_FALLBACK.profile.company,
          blog: userJson.blog || VERIFIED_GITHUB_FALLBACK.profile.blog,
          publicRepos:
            typeof userJson.public_repos === 'number'
              ? userJson.public_repos
              : VERIFIED_GITHUB_FALLBACK.profile.publicRepos,
          followers:
            typeof userJson.followers === 'number'
              ? userJson.followers
              : VERIFIED_GITHUB_FALLBACK.profile.followers,
          following:
            typeof userJson.following === 'number'
              ? userJson.following
              : VERIFIED_GITHUB_FALLBACK.profile.following,
        }
      : VERIFIED_GITHUB_FALLBACK.profile;

    let repositories = VERIFIED_GITHUB_FALLBACK.repositories;
    let totalStars = VERIFIED_GITHUB_FALLBACK.totalStars;
    let totalForks = VERIFIED_GITHUB_FALLBACK.totalForks;
    let languages = VERIFIED_GITHUB_FALLBACK.languages;

    if (Array.isArray(reposJson) && reposJson.length > 0) {
      totalStars = reposJson.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
      totalForks = reposJson.reduce((acc, r) => acc + (r.forks_count || 0), 0);

      const langCounter: Record<string, number> = {};
      let totalWithLang = 0;
      for (const r of reposJson) {
        if (!r.language) continue;
        const key = r.language === 'Blade' || r.language === 'PHP' ? 'Blade / PHP' : r.language;
        langCounter[key] = (langCounter[key] || 0) + 1;
        totalWithLang += 1;
      }

      if (totalWithLang > 0) {
        languages = Object.entries(langCounter)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([lang, count]) => ({
            language: lang,
            count,
            percentage: Math.max(1, Math.round((count / totalWithLang) * 100)),
            color:
              lang === 'Blade / PHP'
                ? LANGUAGE_COLORS.Blade
                : LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.Other,
          }));
      }

      repositories = reposJson.slice(0, 16).map((r) => ({
        id: r.id,
        name: r.name,
        fullName: r.full_name,
        description: r.description || null,
        language: r.language || null,
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        pushedAt: r.pushed_at,
        updatedAt: r.updated_at,
        htmlUrl: r.html_url,
        homepage: r.homepage || null,
        topics: r.topics || [],
        isFork: Boolean(r.fork),
      }));
    }

    let events = VERIFIED_GITHUB_FALLBACK.events;
    if (Array.isArray(eventsJson) && eventsJson.length > 0) {
      events = eventsJson.slice(0, 14).map((ev) => {
        let action = 'Activity on';
        let detail: string | null = null;
        if (ev.type === 'WatchEvent') {
          action = 'Starred repository';
        } else if (ev.type === 'ForkEvent') {
          action = 'Forked repository';
          detail = ev.payload?.forkee?.full_name || null;
        } else if (ev.type === 'PushEvent') {
          const count = ev.payload?.commits?.length || ev.payload?.size || 1;
          action = count > 1 ? `Pushed ${count} commits to` : 'Pushed commit to';
          detail =
            ev.payload?.commits?.[0]?.message?.split('\n')[0] ||
            (ev.payload?.ref ? ev.payload.ref.replace('refs/heads/', 'branch: ') : null);
        } else if (ev.type === 'CreateEvent') {
          action = `Created ${ev.payload?.ref_type || 'resource'} in`;
          detail = ev.payload?.ref || null;
        } else if (ev.type === 'PullRequestEvent') {
          action = `${ev.payload?.action === 'opened' ? 'Opened' : 'Updated'} pull request in`;
          detail = ev.payload?.pull_request?.title || null;
        }
        const repoName = ev.repo?.name || GITHUB_USERNAME;
        return {
          id: String(ev.id),
          type: ev.type,
          action,
          repoName,
          repoUrl: `https://github.com/${repoName}`,
          detail,
          createdAt: ev.created_at,
        };
      });
    }

    let contributions = VERIFIED_GITHUB_FALLBACK.contributions;
    let totalContributionsLastYear = VERIFIED_GITHUB_FALLBACK.totalContributionsLastYear;
    if (contribJson && Array.isArray(contribJson.contributions) && contribJson.contributions.length > 0) {
      contributions = contribJson.contributions.map((c: { date: string; count: number; level: number }) => ({
        date: c.date,
        count: c.count || 0,
        level: Math.min(4, Math.max(0, c.level || 0)) as 0 | 1 | 2 | 3 | 4,
      }));
      if (typeof contribJson.total?.lastYear === 'number') {
        totalContributionsLastYear = contribJson.total.lastYear;
      } else {
        totalContributionsLastYear = contributions.reduce((acc, d) => acc + d.count, 0);
      }
    }

    return {
      profile,
      totalStars,
      totalForks,
      totalContributionsLastYear,
      repositories,
      events,
      contributions,
      languages,
      syncedAt: new Date().toISOString(),
      isLive: true,
    };
  } catch {
    return VERIFIED_GITHUB_FALLBACK;
  }
}
