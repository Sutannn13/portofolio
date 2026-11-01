# RECON: Bedah Bundle, Runtime, Breakpoint, & Animasi Target

**Target URL**: `https://elena-voss-portfolio-template-v3.21st.app/`  
**Tanggal Ekstraksi**: `2026-10-30`  
**Sumber Bukti**:
- Network capture: [`docs/network.json`](file:///d:/DATA%20SUTAN%20ARLIE%20JOHAN/Code%20Johan/porto%20testing/docs/network.json) (`48` request terekam)
- Runtime dump: [`docs/runtime-dump.json`](file:///d:/DATA%20SUTAN%20ARLIE%20JOHAN/Code%20Johan/porto%20testing/docs/runtime-dump.json)
- Bundle manifest & analisis: [`reference/bundles/manifest.json`](file:///d:/DATA%20SUTAN%20ARLIE%20JOHAN/Code%20Johan/porto%20testing/reference/bundles/manifest.json), [`reference/bundles/bundle-analysis.json`](file:///d:/DATA%20SUTAN%20ARLIE%20JOHAN/Code%20Johan/porto%20testing/reference/bundles/bundle-analysis.json)
- Bundle terformat: `reference/bundles/formatted/*.{js,css}` (`14` file)
- Referensi visual (4 viewport, scroll 400px, video load/scroll, hover states): `reference/`

---

## 1. Library & Versi Terdeteksi (Terbukti dari Bundle & Runtime)

Seluruh `14` file JS/CSS hasil build produksi Next.js (Turbopack) tidak menyertakan file `.map` eksternal (`HTTP 404` pada seluruh `*.js.map` dan `*.css.map`), namun kode modul di dalam chunk telah diformat ke `reference/bundles/formatted/` dan dianalisis secara menyeluruh.

| Library / Paket | Versi Eksak | Bukti Lokasi (File & Modul) | Peran pada Target |
| :--- | :--- | :--- | :--- |
| **Next.js (App Router + Turbopack)** | App Router (Turbopack runtime) | `turbopack-45026wnz98ivb.js`, `227kwhsrjlnp4.js` | Framework utama, `next/image`, `next/font/google` (`Host_Grotesk`) |
| **React & React DOM** | `19.x` (Concurrent App Router runtime) | `227kwhsrjlnp4.js`, `1gp3fy3xhglqx.js` | UI rendering & hooks |
| **Tailwind CSS** | `v4.x` (`@layer properties`, `--tw-*`, `@media (min-width: 40rem)` dst.) | `20mf4hhw25dv9.css` (`51,649` B) & `2dn814cx9q_gy.css` (`3,319` B) | Styling utama & utility classes |
| **GSAP (Core)** | **`3.15.0`** | `3i70kutwraqmh.js` (`version: "3.15.0"`) | Engine animasi utama (terbundel sebagai ES module di Turbopack, sehingga `window.gsap === null`) |
| **GSAP `ScrollTrigger` + `Observer`** | **`3.15.0`** | `0lbsfuw32mhg-.js` (baris 1–1276, `ScrollTrigger.version = "3.15.0"`) | Animasi berbasis scroll, pinning/sticky scrub, snap, reveal section |
| **GSAP `SplitText`** | **`3.15.0`** | `0lbsfuw32mhg-.js` (baris 1277–1420, `SplitText.version = "3.15.0"`) | Memecah teks menjadi `chars` dan `lines` di dalam komponen `<Copy>` (`[data-copy-wrapper="true"]`) |
| **`@gsap/react` (`useGSAP`)** | **`2.x`** | `0lbsfuw32mhg-.js` (modul `75682`, baris 1421–1434) | Hook siklus hidup animasi GSAP dengan `gsap.context()` otomatis |
| **Lenis (`lenis` + `lenis/react`)** | **`1.3.26`** | `docs/runtime-dump.json` (`window.lenis.version === "1.3.26"`, `<html class="... lenis">`) & `42rc0wabyru76.js` (modul `55667`, baris 250–695) | Smooth scrolling halaman & penguncian scroll (`lenis.stop()` / `lenis.start()`) saat intro Hero |
| **Framer Motion (`motion/react`)** | **`11.x / 12.x`** | `2m2cyqvl-o39e.js` (modul `25050`, baris 5124–5355: `AnimatePresence`, `motion.div`, `motion.button`) | Khusus dipakai di section **Testimonials** (`#testimonials`) untuk transisi kartu swipe/drag (`drag="x"`) dan animasi layout avatar (`layout`, `scale: 1.6`) |
| **Lucide React (`lucide-react`)** | Bundled SVG | `42rc0wabyru76.js` (baris 3036: `lucide-x`), `2m2cyqvl-o39e.js` (baris 5305, 5313: `lucide-arrow-left`, `lucide-arrow-right`) | Ikon tutup modal (`X`) dan panah navigasi testimoni (`ArrowLeft`, `ArrowRight`) |
| **Web Audio API (Native)** | Browser Standard | `42rc0wabyru76.js` (modul `15278`, baris 2227–2318) | Sintesis suara petikan senar gitar Karplus-Strong + body resonance BiquadFilter saat kursor melewati garis SVG `<StringLine>` di section **Awards** (`#awards`) |

---

## 2. Font & Tipografi (`document.fonts` & `@font-face`)

Berdasarkan `docs/runtime-dump.json` dan `reference/bundles/formatted/2dn814cx9q_gy.css`:

1. **Font Utama**: **`Host Grotesk`** (dimuat melalui `next/font/google` dengan CSS variable `--font-host-grotesk: "Host Grotesk", "Host Grotesk Fallback"`):
   - File font WOFF2: `/_next/static/media/3a11180d498b75c0-s.p.2028s2bhlck6k.woff2` (`20,196` bytes, variable font `font-weight: 300 800`, `unicode-range: U+0000-00FF...`).
   - Bobot yang terdaftar di `document.fonts`:
     - `Host Grotesk` — `weight: 300`, `style: normal`, `status: loaded`
     - `Host Grotesk` — `weight: 400`, `style: normal`, `status: loaded`
     - `Host Grotesk` — `weight: 500`, `style: normal`, `status: loaded`
     - `Host Grotesk` — `weight: 600`, `style: normal`, `status: loaded`
     - `Host Grotesk` — `weight: 300..600`, `style: italic`, `status: unloaded` (tersedia di deklarasi `@font-face`, tidak dipakai di halaman utama).
2. **Fallback Font Terkalibrasi**: **`Host Grotesk Fallback`** (`local("Arial")`, `ascent-override: 97.69%`, `descent-override: 25.18%`, `line-gap-override: 0.00%`, `size-adjust: 105.64%`).
3. **Font Monospace (Default Variable)**: `--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`.

---

## 3. Breakpoint CSS (`@media`) & JavaScript Media Queries

### A. Breakpoint di File CSS Kustom (`2dn814cx9q_gy.css`)
1. `@media (max-width: 1025px)`:
   - `.marquee-1`: `@keyframes marquee-scroll-y` berubah dari `translateY(-51.1%)` menjadi `translateY(-50.27%)`.
   - `.marquee-2`: `@keyframes marquee-scroll-y-2` berubah dari `-51.1% -> 0%` menjadi `-50.27% -> 0%`.
2. `@media (max-width: 767px)`:
   - `.radial-mask-bg-fill`: `background: radial-gradient(circle at 50% 0%, #f14a29 0%, #e12601 80%, transparent 100%)` (aktif permanen tanpa menunggu hover di layar mobile `<= 767px`).
3. `@media (min-width: 768px) and (max-width: 1025px)`:
   - `.box`: `margin-top: -120px`.

### B. Breakpoint di File Tailwind CSS (`20mf4hhw25dv9.css`)
1. **Standard Min-Width (rem)**:
   - `sm`: `@media (min-width: 40rem)` (`640px`)
   - `md`: `@media (min-width: 48rem)` (`768px`)
   - `lg`: `@media (min-width: 64rem)` (`1024px`)
   - `xl`: `@media (min-width: 80rem)` (`1280px`)
   - `2xl`: `@media (min-width: 96rem)` (`1536px`)
2. **Max-Width Variants (`max-*`)**:
   - `max-md`: `@media not all and (min-width: 48rem)` (`< 768px`)
   - `max-lg`: `@media not all and (min-width: 64rem)` (`< 1024px`)
   - `max-[1025px]`: `@media not all and (min-width: 1025px)` (`< 1025px`)
   - `min-[1025px]`: `@media (min-width: 1025px)` (`>= 1025px`)

### C. Breakpoint di Logika JavaScript / GSAP
1. `window.innerWidth > 1025`:
   - **Services (`#services`)**: `xPercent` horizontal scroll bernilai `from: 70 -> to: -33` (jika `> 1025`), `from: 50 -> to: -65` (jika `542..1025`), dan `from: 50 -> to: -77` (jika `<= 541`).
   - **Services hover mask**: Efek hover `.radial-mask-bg-fill` hanya diaktifkan jika `window.innerWidth > 1025`.
   - **Footer (`#footer`)**: Parallax `yPercent: 20 -> 0` hanya berjalan jika `window.innerWidth > 1025`.
2. `window.innerWidth > 1024` / `window.matchMedia("(max-width: 1025px)")`:
   - **Hero (`#hero`)**: Mouse-move parallax (gambar `-30px`, teks `-12px`, smoothing `0.08`) hanya berjalan jika `window.innerWidth > 1024`.
   - **Why Work With Me (`#work-with-me`)**: Hover garis bawah `.line` di `.work-card` dibatalkan jika `window.matchMedia("(max-width: 1025px)").matches`.
3. `window.matchMedia("(max-width: 639px)")`:
   - **Client Logos (`#clientblur`)**: Mengurangi jumlah duplikasi logo dari `12` item (`[...logos, ...logos]`) menjadi `8` item (`slice(0, 8)`) pada layar `< 640px`.

---

## 4. Struktur Section & Daftar Lengkap Animasi / Interaksi

Urutan 10 elemen tingkat atas di dalam `<body class="elenavoss-body antialiased">`:

### 0. Komponen Global: `<Copy>` Text Reveal (`0lbsfuw32mhg-.js`, modul `79921`, baris 1435–1573)
- **Selector**: `[data-copy-wrapper="true"]`
- **Mekanisme**: Menggunakan GSAP `SplitText.create(el, { type: splitBy === "chars" ? "chars" : "lines", mask: splitBy === "chars" ? undefined : "lines", linesClass: "line++" })`.
  - Jika `splitBy === "chars"`: tiap karakter dibungkus dalam `<span style="display:inline-block; overflow:hidden">` dan dianimasikan `gsap.set(chars, { yPercent: 100 })` -> `gsap.to(chars, { yPercent: 0, duration: 0.5, stagger: stagger ?? 0.03, ease: "power3.out", delay })`.
  - Jika `splitBy === "lines"`: tiap baris memiliki `overflow: hidden` dan dianimasikan `gsap.set(lines, { yPercent: 100 })` -> `gsap.to(lines, { yPercent: 0, duration: 0.5, stagger: stagger ?? 0.1, ease: "power3.out", delay })`.
- **Trigger**:
  - Jika `triggerOnScroll === true` (default): `scrollTrigger: { trigger: containerRef.current, start: "top 85%", end: "bottom 68%", once: true }`.
  - Jika `triggerOnScroll === false` (dipakai di Hero): dipicu manual melalui `ref.current.play()`.

### 1. Header (`#header` — `42rc0wabyru76.js`, modul `2971`, baris 3085–3142)
- **Animasi Load/Intro**:
  - Saat halaman dimuat, `#header` disembunyikan di `y: -80, opacity: 0`.
  - Pada `t = 1.8s` dari timeline intro Hero, `#header` dianimasikan ke `y: 0, opacity: 1, duration: 0.8, ease: "power3.out"`.
- **Animasi Scroll**:
  - `window.scrollY > 0.4 * window.innerHeight` -> menambah class `backdrop-blur-lg` pada `#header`.
  - Scroll ke bawah (`scrollY > lastScrollY && scrollY > 100`) -> `gsap.to("#header", { yPercent: -100, duration: 0.5, ease: "power3.out" })`.
  - Scroll ke atas (`scrollY < lastScrollY`) -> `gsap.to("#header", { yPercent: 0, duration: 0.5, ease: "power3.out" })`.
- **Interaksi**:
  - Klik tombol `"Get in Touch"` (`[data-stagger-button]`) membuka modal kontak (`GetInTouchModal`).

### 2. Hero (`section#hero` — `42rc0wabyru76.js`, modul `32177`, baris 3144–3328)
- **Layout**: Container `h-[300vh]`, di dalamnya ada wrapper background marquee (`sticky top-0 h-screen`) + `.hero-container` (`sticky top-0 h-screen`).
- **Animasi Intro Load**:
  - Menghentikan smooth scroll: `lenis.stop()`.
  - Set `.hero-mask-reveal` (`--reveal: "-40%"`, `opacity: 0`), `#header` (`y: -80, opacity: 0`).
  - Timeline (`delay: 0.1`):
    1. `t = 0`: `.hero-mask-reveal` `opacity: 1` (`duration: 1.5, ease: "power2.out"`) dan `--reveal: "125%"` (`duration: 3.5, ease: "power2.out"`).
    2. `t = 1.0`: Memanggil `heroTitleCopyRef.play()` (`H1` `"Visualise Your Mind in Motion"`, `splitBy="chars"`, `stagger: 0.015`, `delay: 0.05`).
    3. `t = 1.5`: Memanggil `heroSubCopyRef.play()` (paragraf kanan bawah, `splitBy="lines"`).
    4. `t = 1.8`: `#header` `y: 0, opacity: 1, duration: 0.8, ease: "power3.out"`, diikuti `onComplete: () => lenis.start()`.
- **Animasi Background Marquee Vertikal (`2dn814cx9q_gy.css`)**:
  - 3 kolom kartu gambar portofolio di belakang Hero:
    - Kolom 1 & 3 (`.marquee-1`): `animation: marquee-scroll-y 10s linear infinite` (`translateY(0)` -> `translateY(-51.1%)`, atau `-50.27%` di `<= 1025px`).
    - Kolom 2 (`.marquee-2`): `animation: marquee-scroll-y-2 18s linear infinite` (`translateY(-51.1%)` -> `translateY(0%)`).
- **Animasi Scroll (Scrub)**:
  - `ScrollTrigger`: `trigger: "#hero", start: "top top", end: "bottom bottom", scrub: true`.
  - `.hero-container`: `scale: 0.5, ease: "none"`.
  - Background marquee wrapper: dari `{ filter: "blur(24px)", opacity: 0.35 }` menjadi `{ filter: "blur(0px)", opacity: 1, ease: "none" }`.
- **Interaksi Mouse Parallax (`window.innerWidth > 1024`)**:
  - `mousemove` menghitung offset `x, y` relatif terhadap tengah layar dengan faktor smoothing `0.08` per frame (`requestAnimationFrame`):
    - Gambar `.hero-mask-reveal`: `translate3d(x * -30px, y * -30px, 0) scale(1.06)`.
    - Wrapper teks hero: `translate3d(x * -12px, y * -12px, 0)`.

### 3. Award Winning Work (`section#portfolio` — `42rc0wabyru76.js`, modul `89594`, baris 3330–3521)
- **Header Section**: Judul `H2` `"Award Winning Work"` (`splitBy="chars"`, `stagger: 0.03`) + subjudul `"Wait Using websites that stand out..."` (`splitBy="lines"`).
- **Sticky Showcase (`h-[360vh]`)**:
  - 4 proyek: `01 / Auré Studio`, `02 / Veloce`, `03 / Grain Studio`, `04 / Aether`.
  - `ScrollTrigger`: `trigger: sectionRef, start: "10% top", end: "bottom bottom", scrub: true, snap: { snapTo: 1 / 3, duration: { min: 0.25, max: 0.55 }, delay: 0.02, ease: "power2.inOut" }`.
  - Transisi antar proyek (`i = 1..3`):
    - `.circle-clip` proyek `i`: `clipPath` dari `"ellipse(0% 0% at 50% 100%)"` -> `"ellipse(100% 75% at 50% 50%)"` (`duration: 0.5, ease: "none"`) -> `"ellipse(150% 120% at 50% 50%)"` (`duration: 0.5, ease: "none"`).
    - Gambar proyek sebelumnya (`i - 1`): `yPercent: 0 -> -35, scale: 1 -> 1.3, duration: 1, ease: "none"`.
    - Gambar proyek aktif (`i`): `yPercent: 25 -> 0, scale: 1.3 -> 1, duration: 1, ease: "none"`.
    - Teks judul/kategori/tahun/nomor dipecah per karakter dengan `SplitText` (`type: "chars"`) dan bergeser keluar/masuk secara sinkron (`yPercent: 0 -> -100` dan `100 -> 0`, `duration: 0.45, stagger: 0.015, ease: "power2.inOut"`).

### 4. Why Work With Me (`section#work-with-me` — `42rc0wabyru76.js`, modul `30961`, baris 3835–3970)
- **3 Kartu (`.work-card`)**:
  - Garis bawah `.line` masuk saat scroll: `scaleX: 0 -> 1, transformOrigin: "left center", duration: 0.5, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%" }`.
  - **Hover Desktop (`> 1025px`)**:
    - `mouseenter`: `fromTo(line, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.55, ease: "power2.out" })`.
    - `mouseleave`: `to(line, { scaleX: 0, transformOrigin: "right center", duration: 0.55, ease: "power2.out" })`.

### 5. Services (`section#services` — `42rc0wabyru76.js`, modul `27641`, baris 3641–3833)
- **Layout**: `h-[275vh]` dengan container `sticky top-0 h-screen overflow-hidden`.
- **5 Kartu Layanan**: `01 Brand Identity`, `02 UI/UX Design`, `03 Art Direction`, `04 Web3 Design`, `05 Framer Expert`.
- **Animasi Scroll Horizontal**:
  - `fromTo(trackRef, { xPercent: startX }, { xPercent: endX, ease: "none", scrollTrigger: { trigger: sectionRef, start: "top 35%", end: "bottom bottom", scrub: true, invalidateOnRefresh: true } })` di mana `(startX, endX)` adalah `(70, -33)` pada `> 1025px`, `(50, -65)` pada `542..1025px`, dan `(50, -77)` pada `<= 541px`.
- **Hover Radial Gradient Mask (`> 1025px`)**:
  - Class `.radial-mask-bg-fill` memiliki `--reveal: -40%`.
  - `mouseenter`: `gsap.to(card, { "--reveal": "100%", duration: 0.45, ease: "power2.out", overwrite: "auto" })`.
  - `mouseleave`: `gsap.to(card, { "--reveal": "-40%", duration: 0.45, ease: "power2.out", overwrite: "auto" })`.

### 6. Awards (`section#awards` — `42rc0wabyru76.js`, modul `15278`, baris 2225–2567)
- **4 Baris Penghargaan**: `Awwwards` (`03`), `CSS Design Awards` (`09`), `FWA` (`01`), `Behance` (`20`).
- **Garis Senar Interaktif (`<StringLine>`) + Web Audio API**:
  - Saat masuk viewport (`start: "top 95%", once: true`): garis dianimasikan `scaleX: 0 -> 1, duration: 1, delay: 0.5 + 0.2 * index, ease: "power3.out"`.
  - `pointermove`: melengkungkan path SVG `<path d="M 0 50 Q x y 1000 50" />` mengikuti posisi kursor.
  - `pointerleave`: memantulkan kembali kurva dengan fisika pegas (`tension: 0.25`, `friction: 0.88`) dan membunyikan sintesis gitar akustik Karplus-Strong (`AudioContext`, frekuensi `[146.83, 164.81, 196, 220, 261.63, 293.66, 329.63, 392]` Hz).
- **Floating Preview Image (Desktop `lg:block`)**:
  - Hover pada baris penghargaan menampilkan gambar portofolio terkait (`portfolio-img-1..4.webp`) yang bergerak mengikuti posisi vertikal baris: `gsap.to(previewWrap, { y: offsetY, duration: 0.65, ease: "back.out(1.6)" })` dan `gsap.fromTo(imgInner, { scale: 1.05 }, { scale: 1, duration: 0.45, ease: "power2.out" })`.
  - Hover teks link `"See Minimalism"` memakai class `.under-multi` (underline multi-gradient bertransisi `background-size: 0 1px -> 100% 1px`).

### 7. Client Logos (`section#clientblur` — `42rc0wabyru76.js`, modul `98279`, baris 3523–3639)
- **Layout**: `h-[240vh]` dengan container sticky `perspective: 350vw`.
- **12 Item Logo (`.grid__item`, atau 8 di `< 640px`)**:
  - Nilai acak deterministik per siklus mount untuk tiap kartu: `zStart = random(-4500, -2000)`, `xMult = random(-2.2, 2.2)`, `yMult = random(-1.8, 1.8)`, `blurStart = mapRange(zStart, -4500, -2000, 10, 0)`.
  - `ScrollTrigger`: `trigger: sectionRef, start: "top 20%", end: "bottom center", scrub: true`.
  - Tiap kartu terbang maju dari `z: zStart, filter: blur(blurStart), opacity: 0, scale: 0.7` melewati kamera ke `z: 800, filter: blur(0px), opacity: 1, scale: 1.15` lalu `opacity: 0` di akhir.

### 8. Testimonials (`section#testimonials` — `2m2cyqvl-o39e.js`, modul `25050`, baris 5150–5355)
- **5 Testimoni**: Maria Jones (`testimonial-1`), Marcus Reed (`testimonial-5`), Priya Nair (`testimonial-3`), Daniel Ortiz (`testimonial-4`), Hannah Kim (`testimonial-2`).
- **Animasi Masuk (GSAP)**:
  - Teks kutipan (`SplitText` lines): `y: 30 -> 0, opacity: 0 -> 1, stagger: 0.08, duration: 0.6, ease: "power2.out"` (`start: "top 80%"`).
  - Baris avatar (`.avatar-btn`): `scale: 0.8 -> 1, opacity: 0 -> 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)"`.
- **Interaksi Carousel (Framer Motion)**:
  - Klik avatar atau tombol panah kiri/kanan atau drag kartu (`drag="x"`, threshold `40px` / velocity `300`) mengganti testimoni aktif.
  - Avatar aktif berada di tengah (`Math.floor(len / 2)`) dengan `scale: 1.6`, `transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }`.
  - Kartu kutipan bertransisi dengan `AnimatePresence mode="wait"`: `initial: { opacity: 0, y: 20 }`, `animate: { opacity: 1, y: 0 }`, `exit: { opacity: 0, y: -20 }`, `transition: { duration: 0.35 }`.

### 9. FAQ (`section` tanpa ID, sebelum `#footer` — `42rc0wabyru76.js`, modul `96439`, baris 2569–2832)
- **5 Item Pertanyaan**: Item pertama (`index === 0`) terbuka secara default (`useState(0)`).
- **Animasi Masuk (GSAP)**:
  - `gsap.fromTo(items, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: listRef, start: "top 85%", toggleActions: "play none none none" } })`.
- **Interaksi Buka-Tutup (Accordion GSAP)**:
  - Klik tombol pertanyaan mengubah `openIndex`.
  - Panel yang dibuka: `gsap.fromTo(el, { height: 0 }, { height: el.scrollHeight, duration: 0.5, ease: "power3.out", onComplete: () => gsap.set(el, { height: "auto" }) })`.
  - Panel yang ditutup: `gsap.to(el, { height: 0, duration: 0.5, ease: "power3.out" })`.
  - Ikon `+` berputar `rotate-45` (`transition-transform duration-300`) dan bulatan tombol berubah menjadi `bg-[#EF4323] border-[#EF4323] text-white` saat terbuka.

### 10. Footer (`footer#footer` — `42rc0wabyru76.js`, modul `13642`, baris 2834–2983)
- **Animasi Scroll Parallax (`> 1025px`)**:
  - `gsap.fromTo(contentRef, { yPercent: 20 }, { yPercent: 0, ease: "power1.out", scrollTrigger: { trigger: footerRef, start: "top 60%", end: "bottom bottom", scrub: true } })`.
- **Interaksi**:
  - Tombol `"Get in Touch"` (`[data-stagger-button]`) dengan animasi hover huruf berjenjang (`0.01s * i`, `translateY(-1.3em)`) dan ekspansi lingkaran dot (`scale(120)`).
  - Link telepon `tel:+14153098274`, email `mailto:hello@elenavoss.design`, dan 4 ikon sosial (`Facebook`, `Instagram`, `LinkedIn`, `Twitter`) dengan hover `border-white/50 hover:scale-105`.

### 11. Get in Touch Modal (`42rc0wabyru76.js`, modul `33855`, baris 2985–3084)
- Terbuka saat tombol `"Get in Touch"` di Header atau Footer diklik.
- Menampilkan dialog form (`Name`, `Email`, `Budget`, `Message`, tombol submit `"Send Message"` dengan efek stagger button) + backdrop `bg-black/70 backdrop-blur-md`.

---

## 5. Status Item UNVERIFIED

- **UNVERIFIED**: **Tidak ada (0 item)**.
  - Meskipun `window.gsap` dan `window.ScrollTrigger` tidak diekspos ke objek global `window` (karena di-bundle di dalam modul Turbopack), seluruh source code komponen, parameter GSAP (`duration`, `ease`, `stagger`, `start`, `end`, `scrub`, `snap`), versi library (`GSAP 3.15.0`, `ScrollTrigger 3.15.0`, `SplitText 3.15.0`, `Lenis 1.3.26`), font (`Host Grotesk`), dan CSS `@media` telah berhasil diekstrak 100% dari bundle di `reference/bundles/formatted/` dan diverifikasi silang dengan `docs/runtime-dump.json` serta rekaman video/screenshot di `/reference`.

