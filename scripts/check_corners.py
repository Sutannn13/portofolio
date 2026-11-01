from PIL import Image
for p in ['project-hmti-ubsi.png', 'project-kode-kiri.png', 'project-mau-kitchen.png']:
    im = Image.open('public/projects/' + p)
    print(p, 'corners:', im.getpixel((0,0)), im.getpixel((im.width-1, 0)), im.getpixel((0, im.height-1)), im.getpixel((im.width-1, im.height-1)))
