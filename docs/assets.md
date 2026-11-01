# ASSETS INVENTORY & VERIFICATION (`FASE 2`)

Seluruh `25` aset diunduh secara bit-perfect (tanpa perubahan, kompresi ulang, atau modifikasi) dari target `https://elena-voss-portfolio-template-v3.21st.app` ke direktori `/public`. Hash SHA-256 dihitung saat unduhan di memori dan diverifikasi ulang terhadap file di disk (`hashVerified: true` pada seluruh 25 aset).

| No | Nama File (`/public`) | Ukuran (Bytes) | Dimensi (`px`) | SHA-256 Hash | Verifikasi Hash | Dipakai di Section Mana |
| :--- | :--- | ---: | :--- | :--- | :---: | :--- |
| 1 | `/elena-voss.svg` | `4,610` | `445x77` | `9764b3556b24f19f0cb083416ce9f7b8458463114931da3acb9cbd62e2cb2f45` | `MATCH (TRUE)` | Header (`#header`), Footer (`#footer`) |
| 2 | `/hero-bg-full-img.webp` | `108,430` | `1142x1378` | `353e250a3131c152179cd08ebdce4c77c6feefbc5f70211190560e39dab7e9a5` | `MATCH (TRUE)` | Hero (`#hero` main portrait dengan `.hero-mask-reveal`) |
| 3 | `/portfolio-img-1.webp` | `77,598` | `1920x1080` | `da0615a953a22483895d0a11b5be8833855151ee9bbebc178970119d6c2d8d93` | `MATCH (TRUE)` | Hero background marquee (`#hero`), Award Winning Work (`#portfolio` — Proyek 1: Auré Studio), Awards (`#awards` — Awwwards hover preview) |
| 4 | `/portfolio-img-2.webp` | `324,542` | `1920x1080` | `b0099821807347c3b27892ca28051ffb2e41c13960e4a4d9828f65c06e7d8e59` | `MATCH (TRUE)` | Hero background marquee (`#hero`), Award Winning Work (`#portfolio` — Proyek 2: Veloce), Awards (`#awards` — CSS Design Awards hover preview) |
| 5 | `/portfolio-img-3.webp` | `84,232` | `1920x1136` | `7916b83fa18a080249bf8c13b73184032fa703536cc78ecb1c536cb79665259e` | `MATCH (TRUE)` | Hero background marquee (`#hero`), Award Winning Work (`#portfolio` — Proyek 3: Grain Studio), Awards (`#awards` — The FWA hover preview) |
| 6 | `/portfolio-img-4.webp` | `110,506` | `1920x1080` | `6d83cee6f2e48cd34dd5e6fa12eb7922ae76a5e6ff8962273ff20f2c5ca69482` | `MATCH (TRUE)` | Hero background marquee (`#hero`), Award Winning Work (`#portfolio` — Proyek 4: Aether), Awards (`#awards` — Behance hover preview) |
| 7 | `/clients-1.webp` | `5,172` | `157x53` | `4b78c87a6666369d499c53d80d757e48d576512a8970ecd34cf11393ea6baef9` | `MATCH (TRUE)` | Client Logos (`#clientblur` — Google logo, 2x duplikasi) |
| 8 | `/clients-2.webp` | `1,134` | `76x66` | `e6327c762ee9e7445cdae194cad9f38749030c50e04c4f793aa64c40ee6c1fb1` | `MATCH (TRUE)` | Client Logos (`#clientblur` — Adobe logo, 2x duplikasi) |
| 9 | `/clients-3.webp` | `4,804` | `212x45` | `5303e34e855463af2c0dff2d272f78868ee1a49e638573ac3468885028d49a1c` | `MATCH (TRUE)` | Client Logos (`#clientblur` — JP logo, 2x duplikasi) |
| 10 | `/clients-4.webp` | `5,802` | `243x93` | `32770792c8ce43977aca70cb885b74219b16d65ad153d46275ccc4973be4bee4` | `MATCH (TRUE)` | Client Logos (`#clientblur` — Pinterest logo, 2x duplikasi) |
| 11 | `/clients-5.webp` | `1,636` | `137x137` | `f88ad6139c15ab5382a04affe3137e71c00183005ebeaa5f04c4f1c7103f0ce9` | `MATCH (TRUE)` | Client Logos (`#clientblur` — IBM logo, 2x duplikasi) |
| 12 | `/clients-6.webp` | `1,476` | `132x52` | `4775c17e967534cdb3acaef19f901a51b5dcb7ace8c4f416f71e5d38c211a347` | `MATCH (TRUE)` | Client Logos (`#clientblur` — Intel/Client 6 logo, 2x duplikasi) |
| 13 | `/testimonial-1.webp` | `8,912` | `324x425` | `20515c9c7d2c4debada7ef43e1e8244c54b632f344e91805656d954c62f317c2` | `MATCH (TRUE)` | Testimonials (`#testimonials` — Maria Jones, Head of Marketing, Adobe) |
| 14 | `/testimonial-2.webp` | `41,614` | `892x1172` | `0deaaa1a598bff4e6e4252a8c77b7d60734dd6f9401e4f4578513d04b9f94193` | `MATCH (TRUE)` | Testimonials (`#testimonials` — Hannah Kim, CEO, Loop & Co) |
| 15 | `/testimonial-3.webp` | `68,520` | `892x1172` | `34373df6ceb905fe283d30d59268c4008fb6f24e641d6486485c7640148ecc52` | `MATCH (TRUE)` | Testimonials (`#testimonials` — Priya Nair, VP Growth, Fielder) |
| 16 | `/testimonial-4.webp` | `46,106` | `892x1172` | `281f930abc466a4e592a08e679179deb3b3e4a9cf98613aaac98f72b2ef3d108` | `MATCH (TRUE)` | Testimonials (`#testimonials` — Daniel Ortiz, Creative Director, Wolfframe) |
| 17 | `/testimonial-5.webp` | `27,634` | `892x1172` | `b7e8d70b757d6d73ece83de442e94bd921eefcdb2fbefad3412fd57f1611e04f` | `MATCH (TRUE)` | Testimonials (`#testimonials` — Marcus Reed, Founder, Northline Studio) |
| 18 | `/footer-bg.svg` | `3,062` | `1920x900` | `849b1a7e5a51f97be39d5cf0340c69a78ee59b756f7e54a8656d73935d96ce79` | `MATCH (TRUE)` | Footer (`#footer` background radial glow SVG) |
| 19 | `/facebook.svg` | `944` | `10x19` | `6d82dbda6b1589e6798cc7a76a760d796a384467d72737b47fd588887d7756ce` | `MATCH (TRUE)` | Footer (`#footer` social icon — Facebook) |
| 20 | `/instagram.svg` | `2,092` | `21x21` | `a9b61cc4442fa98cdaaafc35ea1be2a0937e97de6f88e7a01d36a5888f2be5a0` | `MATCH (TRUE)` | Footer (`#footer` social icon — Instagram) |
| 21 | `/linkedIn.svg` | `1,515` | `18x18` | `9f015af8531baaaa074645361e74a2ab13cf18a1ee5e90128ce2a12249f898cd` | `MATCH (TRUE)` | Footer (`#footer` social icon — LinkedIn) |
| 22 | `/twitter.svg` | `2,428` | `17x17` | `8cb1056dac9a409368dd3341338a82ce1a4333e3fd56ed729beab95d33e4b538` | `MATCH (TRUE)` | Footer (`#footer` social icon — Twitter) |
| 23 | `/og-image.webp` | `78,686` | `1280x720` | `fc7ab62efbbdc321af303746071730728dd5de3fea650ba1d512952ef52cade1` | `MATCH (TRUE)` | Metadata OpenGraph & Twitter Card (`og:image`, `twitter:image`) |
| 24 | `/fonts/3a11180d498b75c0-s.p.2028s2bhlck6k.woff2` | `20,196` | `N/A (Font WOFF2, Latin, weights 300-600)` | `5662dcd15d8c7dc5bf2168baa71072e509c5b97167554b861293f68e1aa6dde8` | `MATCH (TRUE)` | Global Typography (`Host Grotesk` di seluruh section) |
| 25 | `/fonts/0d4f81138b703b58-s.3-s8-8wlgr10e.woff2` | `11,840` | `N/A (Font WOFF2, Latin-Ext, weights 300-600)` | `ad1af424e01f4bc276faddfc70ada26f7af4c4ef168bdf34848b7210b7c9e69f` | `MATCH (TRUE)` | Global Typography (`Host Grotesk` untuk karakter Latin-Ext seperti `Auré Studio`) |

## Catatan Teknis Aset
- **Nama File Asli**: Di server target, Next.js menambahkan hash build pada nama file di `/_next/static/media/<nama>.<hash>.<ext>` (termasuk `og-image.0cl-731jabrer.webp` yang di metadata `<meta property="og:image">` target mengarah ke `http://localhost:3000/_next/static/media/og-image.0cl-731jabrer.webp`). Di `/public`, seluruh aset disimpan dengan nama file aslinya (`elena-voss.svg`, `hero-bg-full-img.webp`, `portfolio-img-1..4.webp`, `clients-1..6.webp`, `testimonial-1..5.webp`, `footer-bg.svg`, `facebook.svg`, `instagram.svg`, `linkedIn.svg`, `twitter.svg`, `og-image.webp`) serta 2 file font WOFF2 `Host Grotesk` di `/public/fonts/`.
- **Zero Modification**: Tidak ada satu pun gambar yang dikompres ulang atau diubah ukurannya.
- **Status UNVERIFIED**: Tidak ada (`0` item UNVERIFIED).

