import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}

# 1. Zhipu AI SVG
# Let's check open.bigmodel.cn homepage HTML for logo
try:
    req = urllib.request.Request('https://open.bigmodel.cn/', headers=headers)
    with urllib.request.urlopen(req, timeout=5) as res:
        html = res.read().decode('utf-8', errors='ignore')
        matches = re.findall(r'href="([^"]*(?:logo|icon)[^"]*)"', html, re.I) + re.findall(r'src="([^"]*(?:logo|icon)[^"]*)"', html, re.I)
        print("Zhipu matches:", matches[:10])
except Exception as e:
    print("Zhipu search error:", e)

# 2. 9router search
try:
    req = urllib.request.Request('https://html.duckduckgo.com/html/?q=9router', headers=headers)
    with urllib.request.urlopen(req, timeout=5) as res:
        html = res.read().decode('utf-8', errors='ignore')
        matches = re.findall(r'<a class="result__snippet"[^>]*>(.*?)</a>', html, re.DOTALL)
        for m in matches[:5]:
            clean = re.sub(r'<[^>]+>', '', m).strip()
            print("DDG snippet:", clean)
except Exception as e:
    print("DDG search error:", e)

