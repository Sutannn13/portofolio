from PIL import Image
for p in ['project-hmti-ubsi.png', 'project-kode-kiri.png', 'project-mau-kitchen.png']:
    im = Image.open('public/projects/' + p)
    print(p, 'Format:', im.format, 'Mode:', im.mode, 'Size:', im.size, 'Alpha:', im.mode == 'RGBA')
