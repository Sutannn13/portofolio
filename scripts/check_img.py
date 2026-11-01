from PIL import Image
im = Image.open('public/projects/project-kode-kiri.png')
print('Format:', im.format, 'Mode:', im.mode, 'Size:', im.size)
print('Top-left pixel:', im.getpixel((0,0)))
