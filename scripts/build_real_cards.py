import asyncio
import os
import base64
from playwright.async_api import async_playwright

OUT_DIR = 'public/ai-cards'
os.makedirs(OUT_DIR, exist_ok=True)

def read_base64(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode('utf-8')

CARDS = [
    {
        'id': 'openai',
        'name': 'OpenAI',
        'subtitle': 'GPT-4o · o1 Reasoning · ChatGPT',
        'badge': 'FRONTIER INTELLIGENCE',
        'accent': '#10a37f',
        'accent_glow': 'rgba(16, 163, 127, 0.45)',
        'accent_light': '#34d399',
        'stat1': 'GPT-4o & o1',
        'stat2': 'Reinforcement CoT',
        'stat3': 'Official API',
        'icon_type': 'svg_path',
        'icon_svg': open('public/real-logos/openai.svg', 'r', encoding='utf-8').read()
    },
    {
        'id': 'copilot',
        'name': 'GitHub Copilot',
        'subtitle': 'Copilot Workspace · Edits · Chat',
        'badge': 'DEVELOPER INTELLIGENCE',
        'accent': '#8957e5',
        'accent_glow': 'rgba(137, 87, 229, 0.45)',
        'accent_light': '#a78bfa',
        'stat1': 'Copilot Workspace',
        'stat2': 'Multi-Model Engine',
        'stat3': 'IDE Integration',
        'icon_type': 'img_b64',
        'icon_b64': f"data:image/png;base64,{read_base64('public/real-icons/copilot.png')}"
    },
    {
        'id': 'gemini',
        'name': 'Google Gemini',
        'subtitle': 'Gemini 2.5 Flash & Pro · Ultra',
        'badge': 'MULTIMODAL FRONTIER',
        'accent': '#4285f4',
        'accent_glow': 'rgba(66, 133, 244, 0.45)',
        'accent_light': '#93c5fd',
        'stat1': 'Gemini 2.5 Pro',
        'stat2': 'Native Audio & Vision',
        'stat3': 'Google AI SDK',
        'icon_type': 'img_b64',
        'icon_b64': f"data:image/png;base64,{read_base64('public/real-icons/gemini.png')}"
    },
    {
        'id': 'anthropic',
        'name': 'Anthropic Claude',
        'subtitle': 'Claude 3.7 Sonnet · Opus · Haiku',
        'badge': 'AI RESEARCH LAB',
        'accent': '#d97706',
        'accent_glow': 'rgba(217, 119, 6, 0.45)',
        'accent_light': '#fbbf24',
        'stat1': 'Claude 3.7 Sonnet',
        'stat2': 'Constitutional AI',
        'stat3': 'Native API',
        'icon_type': 'claude_badge',
        'icon_svg': open('public/real-logos/claude.svg', 'r', encoding='utf-8').read().replace('<path ', '<path fill="#ffffff" ')
    },
    {
        'id': 'deepseek',
        'name': 'DeepSeek',
        'subtitle': 'DeepSeek-V3 · DeepSeek-R1 CoT',
        'badge': 'REASONING ARCHITECTURE',
        'accent': '#0ea5e9',
        'accent_glow': 'rgba(14, 165, 233, 0.45)',
        'accent_light': '#38bdf8',
        'stat1': 'DeepSeek-R1 CoT',
        'stat2': '671B MoE Architecture',
        'stat3': 'Fast API Node',
        'icon_type': 'img_b64',
        'icon_b64': f"data:image/png;base64,{read_base64('public/real-icons/deepseek.png')}"
    },
    {
        'id': 'zhipu',
        'name': 'Zhipu AI',
        'subtitle': 'GLM-4 · CogVideoX · BigModel',
        'badge': 'FOUNDATION MODEL',
        'accent': '#3b82f6',
        'accent_glow': 'rgba(59, 130, 246, 0.45)',
        'accent_light': '#60a5fa',
        'stat1': 'GLM-4 Frontier',
        'stat2': 'CogVideoX Multimodal',
        'stat3': 'Open Platform',
        'icon_type': 'img_b64',
        'icon_b64': f"data:image/png;base64,{read_base64('public/real-icons/glm-cn.png')}"
    },
    {
        'id': 'zedai',
        'name': 'Zed AI',
        'subtitle': 'High-Performance Rust Native Editor AI',
        'badge': 'PERFORMANCE COMPILER',
        'accent': '#06b6d4',
        'accent_glow': 'rgba(6, 182, 212, 0.45)',
        'accent_light': '#22d3ee',
        'stat1': 'Fast Native Engine',
        'stat2': 'Sub-ms Stream Parsing',
        'stat3': 'Rust Native',
        'icon_type': 'img_b64',
        'icon_b64': f"data:image/png;base64,{read_base64('public/real-icons/zedai.png')}"
    },
    {
        'id': '9router',
        'name': '9Router',
        'subtitle': 'Unified AI Gateway & Routing Proxy',
        'badge': 'AI MODEL ROUTER',
        'accent': '#f97316',
        'accent_glow': 'rgba(249, 115, 22, 0.50)',
        'accent_light': '#fb923c',
        'stat1': 'Multi-Model Fallback',
        'stat2': 'High Concurrency Mesh',
        'stat3': 'Unified Endpoint',
        'icon_type': 'svg_path',
        'icon_svg': open('public/real-icons/9router-favicon.svg', 'r', encoding='utf-8').read().replace('width="32" height="32"', 'width="100%" height="100%"')
    }
]

HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 700px;
    height: 500px;
    background: #000000;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card {
    width: 700px;
    height: 500px;
    background: #09090d;
    border-radius: 28px;
    position: relative;
    overflow: hidden;
    border: 1.5px solid rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 44px 50px 38px 50px;
  }
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }
  .glow-orb {
    position: absolute;
    width: 440px;
    height: 440px;
    right: -60px;
    top: -60px;
    background: radial-gradient(circle, var(--accent-glow) 0%, rgba(0,0,0,0) 70%);
    filter: blur(50px);
    pointer-events: none;
  }
  .glow-orb-secondary {
    position: absolute;
    width: 300px;
    height: 300px;
    left: 20px;
    bottom: -60px;
    background: radial-gradient(circle, var(--accent-glow) 0%, rgba(0,0,0,0) 70%);
    opacity: 0.35;
    filter: blur(40px);
    pointer-events: none;
  }
  .top-bar {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.2px;
    color: #e5e7eb;
    text-transform: uppercase;
  }
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
  }
  .meta {
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }
  .center-content {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 28px;
  }
  .icon-wrapper {
    width: 128px;
    height: 128px;
    border-radius: 26px;
    background: #111117;
    border: 1.5px solid rgba(255, 255, 255, 0.14);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    padding: 16px;
  }
  .icon-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
  }
  .icon-wrapper svg {
    width: 100%;
    height: 100%;
  }
  .openai-svg svg {
    fill: #ffffff;
  }
  .brand-text {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .brand-title {
    font-size: 44px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.8px;
    line-height: 1.05;
  }
  .brand-subtitle {
    font-size: 17px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.68);
    letter-spacing: -0.2px;
  }
  .brand-highlight {
    font-size: 13px;
    font-weight: 600;
    color: var(--accent-light);
    letter-spacing: 0.4px;
    margin-top: 4px;
    text-transform: uppercase;
  }
  .divider {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
  }
  .bottom-strip {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .stat-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .stat-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.2px;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
  }
  .stat-val {
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.2px;
  }
  .stat-val.accent {
    color: var(--accent-light);
  }
</style>
</head>
<body>
  <div class="card" style="--accent: {{accent}}; --accent-glow: {{accent_glow}}; --accent-light: {{accent_light}};">
    <div class="grid-bg"></div>
    <div class="glow-orb"></div>
    <div class="glow-orb-secondary"></div>

    <div class="top-bar">
      <div class="pill">
        <span class="dot"></span>
        <span>{{badge}}</span>
      </div>
      <div class="meta">ACTIVE INTEGRATION</div>
    </div>

    <div class="center-content">
      <div class="icon-wrapper {{icon_class}}">
        {{icon_element}}
      </div>
      <div class="brand-text">
        <div class="brand-title">{{name}}</div>
        <div class="brand-subtitle">{{subtitle}}</div>
        <div class="brand-highlight">Verified Ecosystem Integration</div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="bottom-strip">
      <div class="stat-col">
        <span class="stat-label">Model Tier</span>
        <span class="stat-val">{{stat1}}</span>
      </div>
      <div class="stat-col">
        <span class="stat-label">Architecture</span>
        <span class="stat-val">{{stat2}}</span>
      </div>
      <div class="stat-col">
        <span class="stat-label">Connection</span>
        <span class="stat-val accent">{{stat3}}</span>
      </div>
    </div>
  </div>
</body>
</html>
"""

async def build():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 700, 'height': 500}, device_scale_factor=2)
        
        for c in CARDS:
            icon_elem = ""
            icon_cls = ""
            if c['icon_type'] == 'img_b64':
                icon_elem = f"<img src='{c['icon_b64']}' alt='{c['name']}' />"
            elif c['id'] == 'openai':
                icon_cls = "openai-svg"
                icon_elem = c['icon_svg']
            elif c['icon_type'] == 'claude_badge':
                icon_elem = f"<div style='width: 100%; height: 100%; background: #d97706; border-radius: 20px; display: flex; align-items: center; justify-content: center; padding: 14px;'>{c['icon_svg']}</div>"
            else:
                icon_elem = c['icon_svg']

            html = HTML_TEMPLATE
            html = html.replace('{{name}}', c['name'])
            html = html.replace('{{subtitle}}', c['subtitle'])
            html = html.replace('{{badge}}', c['badge'])
            html = html.replace('{{accent}}', c['accent'])
            html = html.replace('{{accent_glow}}', c['accent_glow'])
            html = html.replace('{{accent_light}}', c['accent_light'])
            html = html.replace('{{stat1}}', c['stat1'])
            html = html.replace('{{stat2}}', c['stat2'])
            html = html.replace('{{stat3}}', c['stat3'])
            html = html.replace('{{icon_element}}', icon_elem)
            html = html.replace('{{icon_class}}', icon_cls)

            await page.set_content(html)
            await page.wait_for_timeout(300)
            
            out_png = os.path.join(OUT_DIR, f"{c['id']}.png")
            await page.screenshot(path=out_png)
            print(f"Generated high-res PNG card: {out_png}")

        await browser.close()
        print("ALL 8 REAL AI CARDS RENDERED SUCCESSFULLY!")

asyncio.run(build())

