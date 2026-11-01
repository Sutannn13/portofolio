import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = 'public/ai-logos';
fs.mkdirSync(OUT_DIR, { recursive: true });

const CARDS = [
  {
    id: 'openai',
    name: 'OpenAI',
    subtitle: 'GPT-4o · o1 Reasoning · API',
    highlight: 'Autonomous Reasoning & Frontier Models',
    tag: 'FRONTIER INTELLIGENCE',
    tagW: 200,
    metaBadge: '128K TOKENS · REASONING',
    accent: '#10a37f',
    stat1: 'GPT-4o &amp; o1-preview',
    stat2: 'Reinforcement RL',
    stat3: 'Official API Node',
    defs: `<linearGradient id="iconGrad-openai" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10a37f" />
      <stop offset="100%" stop-color="#34d399" />
    </linearGradient>`,
    icon: `<g transform="translate(-30, -30) scale(1.5)">
      <path fill="url(#iconGrad-openai)" d="M28.52 17.65a6.76 6.76 0 0 0-.58-5.32 6.88 6.88 0 0 0-4.04-3.32 6.88 6.88 0 0 0-5.46.21 6.8 6.8 0 0 0-4.04-3.13 6.83 6.83 0 0 0-5.59.88 6.87 6.87 0 0 0-3.38 4.25 6.82 6.82 0 0 0-1.74 5.34 6.87 6.87 0 0 0 2.22 5.09 6.8 6.8 0 0 0-.58 5.32 6.88 6.88 0 0 0 4.04 3.32 6.88 6.88 0 0 0 5.46-.21 6.8 6.8 0 0 0 4.04 3.13 6.83 6.83 0 0 0 5.59-.88 6.87 6.87 0 0 0 3.38-4.25 6.82 6.82 0 0 0 1.74-5.34 6.87 6.87 0 0 0-2.22-5.09Zm-11.4 14.54a4.4 4.4 0 0 1-2.92-1.1l4.8-2.77a.8.8 0 0 0 .4-.69v-6.78l2.03 1.17v5.82a4.42 4.42 0 0 1-4.31 4.35Zm-10.22-5.9a4.42 4.42 0 0 1-.52-3.08l4.8 2.77a.8.8 0 0 0 .8 0l5.87-3.39v2.34l-5.04 2.91a4.42 4.42 0 0 1-5.91-1.55Zm-1.8-11.83a4.4 4.4 0 0 1 2.4-1.99v5.54a.8.8 0 0 0 .4.69l5.87 3.39-2.03 1.17-5.04-2.91a4.42 4.42 0 0 1-1.6-5.89Zm16.14 4.57-5.87-3.39 2.03-1.17 5.04 2.91a4.42 4.42 0 0 1 1.6 5.89 4.4 4.4 0 0 1-2.4 1.99v-5.54a.8.8 0 0 0-.4-.69Zm3.14-3.52-4.8-2.77a.8.8 0 0 0-.8 0l-5.87 3.39V14.4l5.04-2.91a4.42 4.42 0 0 1 6.43 4.63Zm-9.3 5.37-2.67-1.54 2.67-1.54 2.67 1.54-2.67 1.54Z"/>
    </g>`
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    subtitle: 'Claude 3.7 Sonnet · Opus · Haiku',
    highlight: 'Hybrid Thinking &amp; Deep Code Synthesis',
    tag: 'AI RESEARCH LAB',
    tagW: 165,
    metaBadge: '200K CONTEXT · HYBRID CoT',
    accent: '#d97706',
    stat1: 'Claude 3.7 Sonnet',
    stat2: 'Constitutional Safety',
    stat3: 'Native API Connected',
    defs: `<linearGradient id="iconGrad-anthropic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>`,
    icon: `<g transform="translate(-32, -32) scale(2.0)">
      <path fill="url(#iconGrad-anthropic)" d="M14.07 4.22h3.86L26.5 27.78h-3.95l-2.08-5.32H11.53l-2.08 5.32H5.5L14.07 4.22Zm4.87 15.34-3.01-7.7-3.01 7.7h6.02Z"/>
    </g>`
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    subtitle: 'Gemini 2.5 Flash &amp; Pro · Ultra',
    highlight: 'Deep Multimodal &amp; 1M+ Long Context',
    tag: 'MULTIMODAL INTELLIGENCE',
    tagW: 220,
    metaBadge: '1M CONTEXT · NATIVE MULTIMODAL',
    accent: '#4285f4',
    stat1: 'Gemini 2.5 Pro &amp; Flash',
    stat2: 'Native Audio &amp; Vision',
    stat3: 'Google AI SDK',
    defs: `<linearGradient id="iconGrad-gemini" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4285f4" />
      <stop offset="50%" stop-color="#9b72cb" />
      <stop offset="100%" stop-color="#d96570" />
    </linearGradient>`,
    icon: `<g transform="translate(-30, -30) scale(0.6)">
      <path fill="url(#iconGrad-gemini)" d="M50 0C50 27.614 27.614 50 0 50C27.614 50 50 72.386 50 100C50 72.386 72.386 50 100 50C72.386 50 50 27.614 50 0Z"/>
    </g>`
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    subtitle: 'Copilot Workspace · Edits · Chat',
    highlight: 'AI Pair Programmer &amp; Code Agent',
    tag: 'DEVELOPER INTELLIGENCE',
    tagW: 210,
    metaBadge: 'CONTEXT ENGINE · AGENTIC CLI',
    accent: '#8957e5',
    stat1: 'Copilot Workspace',
    stat2: 'Multi-Model Engine',
    stat3: 'IDE Deep Integration',
    defs: `<linearGradient id="iconGrad-copilot" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a78bfa" />
      <stop offset="100%" stop-color="#7c3aed" />
    </linearGradient>`,
    icon: `<g transform="translate(-30, -30) scale(1.5)">
      <path fill="url(#iconGrad-copilot)" d="M20.5 8.2a4 4 0 0 0-4-4h-9a4 4 0 0 0-4 4c0 4.5 2.5 9.5 8.5 12.5 6-3 8.5-8 8.5-12.5zm-11 3a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
      <path fill="#ffffff" opacity="0.9" d="M9.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
      <path fill="url(#iconGrad-copilot)" d="M6 3.5a1.5 1.5 0 0 0-1.5 1.5v2A1.5 1.5 0 0 0 6 8.5h.5V5H8a1.5 1.5 0 0 0-1.5-1.5H6zm14 0h-.5A1.5 1.5 0 0 0 18 5v3.5h.5A1.5 1.5 0 0 0 20 7V5a1.5 1.5 0 0 0-1.5-1.5z"/>
    </g>`
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    subtitle: 'DeepSeek-V3 · DeepSeek-R1',
    highlight: 'Open Weights &amp; Deep Chain-of-Thought',
    tag: 'REASONING ARCHITECTURE',
    tagW: 220,
    metaBadge: '671B MOE · MLA ARCHITECTURE',
    accent: '#0ea5e9',
    stat1: 'DeepSeek-R1 CoT',
    stat2: 'Multi-Head Latent MOE',
    stat3: 'Fast API Endpoint',
    defs: `<linearGradient id="iconGrad-deepseek" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#0284c7" />
    </linearGradient>`,
    icon: `<g transform="translate(-30, -30) scale(1.5)">
      <path fill="url(#iconGrad-deepseek)" d="M6 18c2-4 6-7 12-7 5 0 9 3 11 6-2 3-5 5-9 5-6 0-11-2-14-4z"/>
      <path fill="url(#iconGrad-deepseek)" opacity="0.8" d="M17 11c-2-3-5-6-10-7 1 4 3 7 6 9 1.3-.8 2.7-1.4 4-2z"/>
      <circle cx="22" cy="15" r="1.8" fill="#ffffff"/>
      <path fill="url(#iconGrad-deepseek)" d="M28 17c3 0 5-2 6-4-1 3-3 5-6 6v-2z"/>
    </g>`
  },
  {
    id: 'zhipu',
    name: 'Zhipu AI',
    subtitle: 'GLM-4 · CogVideoX · BigModel',
    highlight: 'Bilingual Frontier Foundation Model',
    tag: 'FOUNDATION MODEL',
    tagW: 180,
    metaBadge: 'GLM-4-PLUS · 128K CONTEXT',
    accent: '#3b82f6',
    stat1: 'GLM-4 Frontier',
    stat2: 'CogVideoX Multimodal',
    stat3: 'Zhipu Open Platform',
    defs: `<linearGradient id="iconGrad-zhipu" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60a5fa" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>`,
    icon: `<g transform="translate(-30, -30) scale(1.5)">
      <path fill="url(#iconGrad-zhipu)" d="M18 4l-9 9 4.5 4.5 9-9L18 4z" opacity="0.9"/>
      <path fill="url(#iconGrad-zhipu)" d="M9 13l-5 5 4.5 4.5 5-5L9 13z" opacity="0.7"/>
      <path fill="url(#iconGrad-zhipu)" d="M17.5 17.5l5 5 5.5-5.5-5-5-5.5 5.5z" opacity="0.95"/>
      <circle cx="20" cy="20" r="3" fill="#ffffff"/>
    </g>`
  },
  {
    id: 'zedai',
    name: 'Zed AI',
    subtitle: 'High-Performance Rust AI Editor',
    highlight: 'Sub-millisecond Latency &amp; Native Assist',
    tag: 'PERFORMANCE COMPILER',
    tagW: 205,
    metaBadge: 'GPU ACCELERATED · RUST NATIVE',
    accent: '#06b6d4',
    stat1: 'Fast Native Engine',
    stat2: 'Sub-ms Stream Parsing',
    stat3: 'Multi-Model Mesh',
    defs: `<linearGradient id="iconGrad-zedai" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="100%" stop-color="#0891b2" />
    </linearGradient>`,
    icon: `<g transform="translate(-30, -30) scale(1.5)">
      <path fill="none" stroke="url(#iconGrad-zedai)" stroke-width="3" stroke-linejoin="round" d="M7 8h18l-14 16h18"/>
      <circle cx="7" cy="8" r="2.5" fill="#22d3ee"/>
      <circle cx="25" cy="24" r="2.5" fill="#0891b2"/>
    </g>`
  },
  {
    id: '9router',
    name: '9Router',
    subtitle: 'Unified AI Gateway &amp; Routing Proxy',
    highlight: 'Zero-Downtime Multi-Model Mesh',
    tag: 'AI MODEL GATEWAY',
    tagW: 175,
    metaBadge: 'SMART FALLBACK · LOW LATENCY',
    accent: '#f97316',
    stat1: 'Multi-Model Fallback',
    stat2: 'High Concurrency Mesh',
    stat3: 'Unified Protocol',
    defs: `<linearGradient id="iconGrad-9router" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fb923c" />
      <stop offset="100%" stop-color="#ea580c" />
    </linearGradient>`,
    icon: `<g transform="translate(-30, -30) scale(1.5)">
      <circle cx="14" cy="12" r="6" fill="none" stroke="url(#iconGrad-9router)" stroke-width="2.5"/>
      <path fill="none" stroke="url(#iconGrad-9router)" stroke-width="2.5" stroke-linecap="round" d="M20 12v9a4 4 0 0 1-4 4h-3"/>
      <circle cx="24" cy="9" r="2" fill="#fb923c"/>
      <circle cx="26" cy="20" r="2" fill="#ea580c"/>
      <circle cx="8" cy="24" r="2" fill="#f97316"/>
    </g>`
  }
];

function buildSvg(c) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 500" width="700" height="500" fill="none">
  <defs>
    <filter id="glow-${c.id}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="70" result="blur" />
    </filter>
    <radialGradient id="radGlow-${c.id}" cx="70%" cy="30%" r="65%">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.38" />
      <stop offset="50%" stop-color="${c.accent}" stop-opacity="0.10" />
      <stop offset="100%" stop-color="#08080c" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="borderGrad-${c.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.55" />
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.14" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05" />
    </linearGradient>
    <pattern id="grid-${c.id}" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1" />
    </pattern>
    ${c.defs}
  </defs>

  <!-- Dark Base -->
  <rect width="700" height="500" rx="24" fill="#08080c" />
  <rect width="700" height="500" rx="24" fill="url(#grid-${c.id})" />

  <!-- Ambient Glow -->
  <circle cx="520" cy="170" r="270" fill="url(#radGlow-${c.id})" filter="url(#glow-${c.id})" />
  <circle cx="140" cy="370" r="180" fill="${c.accent}" fill-opacity="0.07" filter="url(#glow-${c.id})" />

  <!-- Border -->
  <rect x="1.5" y="1.5" width="697" height="497" rx="23" stroke="url(#borderGrad-${c.id})" stroke-width="1.5" fill="none" />

  <!-- Header Pill & Meta -->
  <g transform="translate(44, 44)">
    <rect width="${c.tagW}" height="32" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
    <circle cx="18" cy="16" r="4.5" fill="${c.accent}" />
    <text x="32" y="20.5" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1.4" fill="#e5e7eb">${c.tag}</text>
  </g>

  <g transform="translate(656, 44)">
    <text text-anchor="end" y="21" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" letter-spacing="1" fill="rgba(255,255,255,0.45)">${c.metaBadge}</text>
  </g>

  <!-- Central Brand Presentation -->
  <g transform="translate(50, 142)">
    <rect width="124" height="124" rx="24" fill="#101016" stroke="url(#borderGrad-${c.id})" stroke-width="1.5" />
    <g transform="translate(62, 62)">
      ${c.icon}
    </g>

    <g transform="translate(156, 26)">
      <text font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="42" font-weight="700" fill="#ffffff" letter-spacing="-0.5">${c.name}</text>
      <text y="36" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="400" fill="rgba(255,255,255,0.65)">${c.subtitle}</text>
      <text y="62" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="${c.accent}" letter-spacing="0.3">${c.highlight}</text>
    </g>
  </g>

  <!-- Divider Line -->
  <line x1="44" y1="375" x2="656" y2="375" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

  <!-- Bottom Metric Strip -->
  <g transform="translate(44, 405)">
    <g transform="translate(0, 0)">
      <text font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="1.2" fill="rgba(255,255,255,0.4)">CAPABILITY</text>
      <text y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#ffffff">${c.stat1}</text>
    </g>
    <g transform="translate(215, 0)">
      <text font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="1.2" fill="rgba(255,255,255,0.4)">ARCHITECTURE</text>
      <text y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#ffffff">${c.stat2}</text>
    </g>
    <g transform="translate(435, 0)">
      <text font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="1.2" fill="rgba(255,255,255,0.4)">INTEGRATION</text>
      <text y="24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="${c.accent}">${c.stat3}</text>
    </g>
  </g>
</svg>`;
}

for (const c of CARDS) {
  const svg = buildSvg(c);
  const outPath = path.join(OUT_DIR, `${c.id}.svg`);
  fs.writeFileSync(outPath, svg, 'utf8');
  console.log(`Generated: ${outPath}`);
}
console.log('Successfully generated all 8 AI SVG cards!');

