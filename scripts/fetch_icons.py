import urllib.request
import re

req = urllib.request.Request('https://kodekiri.tech', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    scripts = re.findall(r'src=["\']([^"\']+\.js)["\']', html)
    print('Scripts count:', len(scripts))
    for s in scripts[:8]:
        url = 'https://kodekiri.tech' + s if s.startswith('/') else s
        js_data = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
        if any(w in js_data.lower() for w in ['preloader', 'loading', 'loader']):
            print('Found in:', s)
            for m in re.finditer(r'(?:preloader|loadingScreen|loader)', js_data, re.I):
                pos = m.start()
                print('Snippet:', js_data[max(0, pos-40):pos+80])
                break
except Exception as e:
    print('Failed:', e)


os.makedirs('public/ai-pure-icons', exist_ok=True)

# 1. Download SVGs
svg_contents = {}
for name, url in icons.items():
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            svg_data = resp.read().decode('utf-8')
            svg_contents[name] = svg_data
            print(f'Downloaded {name}: {len(svg_data)} bytes')
    except Exception as e:
        print(f'Failed {name}: {e}')

# 2. Render SVGs to 256x256 transparent PNGs using Playwright
async def render_all():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 256, 'height': 256}, device_scale_factor=2)
        
        for name, svg in svg_contents.items():
            html = f'''
            <!DOCTYPE html>
            <html>
            <head>
            <style>
              * {{ margin: 0; padding: 0; box-sizing: border-box; }}
              body {{
                width: 256px;
                height: 256px;
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
              }}
              svg {{
                width: 210px;
                height: 210px;
                object-fit: contain;
              }}
            </style>
            </head>
            <body>
              {svg}
            </body>
            </html>
            '''
            await page.set_content(html)
            out_path = f'public/ai-pure-icons/{name}.png'
            await page.screenshot(path=out_path, omit_background=True)
            print(f'Rendered {out_path} ({os.path.getsize(out_path)} bytes)')
        
        await browser.close()

asyncio.run(render_all())



