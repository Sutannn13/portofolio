import re, urllib.request

with open('scripts/sutan_page_content.html', 'r', encoding='utf-8') as f:
    text = f.read()

scripts = re.findall(r'<script[^>]+src=["']([^"']+)["']', text)
for s in scripts:
    print(s)
