
with open('scripts/sutan_domcontentloaded.html', 'r', encoding='utf-8') as f:
    html = f.read()

start = html.find('fixed inset-0 z-[9999]')
if start != -1:
    div_start = html.rfind('<div', 0, start)
    # find where it ends or print 4000 characters
    chunk = html[div_start:div_start+4500]
    with open('scripts/sutan_loader_chunk.html', 'w', encoding='utf-8') as out:
        out.write(chunk)
    print('Chunk saved, length:', len(chunk))
