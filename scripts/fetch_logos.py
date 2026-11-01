import urllib.request
import os

OUT_DIR = 'public/real-logos'
os.makedirs(OUT_DIR, exist_ok=True)

urls = {
    'openai': [
        'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openai.svg',
        'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg'
    ],
    'gemini': [
        'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
        'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlegemini.svg'
    ],
    'anthropic': [
        'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg',
        'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg'
    ],
    'claude': [
        'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/claude.svg',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/claude.svg'
    ],
    'copilot': [
        'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/githubcopilot.svg',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/githubcopilot.svg'
    ],
    'deepseek': [
        'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/deepseek.svg',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/deepseek.svg',
        'https://chat.deepseek.com/favicon.svg'
    ],
    'zedai': [
        'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zedindustries.svg',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/zedindustries.svg',
        'https://zed.dev/favicon.ico'
    ],
    'zhipu': [
        'https://open.bigmodel.cn/favicon.ico',
        'https://chatglm.cn/favicon.ico'
    ],
    '9router': [
        'https://9router.com/favicon.ico',
        'https://9router.com/logo.png',
        'https://9router.com/logo.svg'
    ]
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for name, candidates in urls.items():
    success = False
    for u in candidates:
        try:
            req = urllib.request.Request(u, headers=headers)
            with urllib.request.urlopen(req, timeout=5) as res:
                content = res.read()
                ext = 'svg' if 'svg' in u else ('ico' if 'ico' in u else 'png')
                filename = f"{name}.{ext}"
                filepath = os.path.join(OUT_DIR, filename)
                with open(filepath, 'wb') as f:
                    f.write(content)
                print(f"SUCCESS [{name}]: {u} -> {filepath} ({len(content)} bytes)")
                success = True
                break
        except Exception as e:
            print(f"FAILED [{name}] from {u}: {e}")
    if not success:
        print(f"ALL CANDIDATES FAILED for {name}")

