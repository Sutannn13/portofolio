# PLAN: Replikasi Elena Voss Portfolio Template v3

Target: https://elena-voss-portfolio-template-v3.21st.app/
Stack: Next.js (App Router) + React + TypeScript + Tailwind CSS + GSAP/ScrollTrigger

## Daftar Fase & Checklist

### FASE 0 - SETUP TOOLS
- [x] 0a. Pasang/verifikasi REA dari sumber resmi (`github.com/morluto/rea`, `rea.tools`, atau npm `rea-agents`)
- [x] 0b. Pasang Playwright + Chromium (`playwright`), `pixelmatch`, dan `pngjs`
- [x] 0c. Smoke Test REA terhadap target `https://elena-voss-portfolio-template-v3.21st.app/` dan catat di `EVIDENCE.md` serta keputusan tool utama di `PLAN.md`
- [x] 0d. Buat project Next.js + Tailwind + TypeScript kosong (tanpa mulai membangun UI)

#### Keputusan Tool Utama (Berdasarkan Smoke Test Fase 0c)
- **Keputusan**: Menggunakan **Playwright + Chrome DevTools Protocol (CDP) langsung** sebagai **tool utama** untuk Fase 1 s.d. Fase 7, dengan **REA (`inspect_web_page` & `analyze_web_bundle`)** sebagai **tool pendukung inventaris statis**.
- **Alasan (Berdasarkan Bukti di `EVIDENCE.md`)**:
  1. Perintah CLI `rea analyze <url>` gagal (`target_unavailable` / `ENOENT`) karena hanya menerima file artefak lokal.
  2. Ketika dihubungkan ke loopback CDP (`http://127.0.0.1:9222`), MCP tools REA (`list_browser_targets`, `inspect_web_page`, `analyze_web_bundle`) berhasil menginventarisasi 823 DOM nodes, 731 accessibility nodes, 13 script items (beserta SHA-256 dan konfirmasi tidak adanya source map), 20 initial resources, dan mem-parse 197.001 AST nodes (mendeteksi Next.js + React + Turbopack).
  3. Namun, secara arsitektur REA bersifat pasif (tidak mengeksekusi `page.evaluate`, tidak men-scroll, tidak klik/hover, tidak merekam video, meredaksi teks/atribut penuh di DOM, dan mengalami `deadlineExpired` 30s pada chunk `227kwhsrjlnp4.js`). Oleh karena itu, ekstraksi runtime GSAP/ScrollTrigger, computed styles 4 viewport, ekstraksi teks DOM huruf-demi-huruf, perekaman video, screenshot scroll/hover, dan komparasi `pixelmatch` wajib dijalankan dengan **Playwright + CDP**.

### FASE 1 - RECON & BEDAH BUNDLE
- [x] 1a. Capture referensi ke `/reference` (full-page 1440/1024/768/390, per scroll 400px di 1440/390, video load & scroll di 1440/390, hover & state FAQ)
- [x] 1b. Simpan semua network request ke `/docs/network.json`
- [x] 1c. Unduh & bedah bundle JS/CSS (source map / prettier + pencarian kata kunci animasi & interaksi)
- [x] 1d. Dump runtime (`window.gsap`, `ScrollTrigger`, `globalTimeline`, smooth scroll, `document.fonts`) ke `/docs/runtime-dump.json`
- [x] 1e. Deteksi semua breakpoint CSS (`@media`)
- [x] 1f. Tulis ringkasan di `/docs/RECON.md`

### FASE 2 - ASET
- [x] 2a. Unduh semua aset dari `network.json` ke `/public` dengan nama file asli
- [x] 2b. Buat `/docs/assets.md` (nama file, dimensi, SHA-256, pemakaian per section) & verifikasi hash

### FASE 3 - DESIGN TOKENS
- [x] 3a. Dump computed style semua elemen di 4 viewport ke `/docs/computed-styles-{1440,1024,768,390}.json`
- [x] 3b. Susun `/docs/tokens.json`, `tailwind.config.ts`, dan `globals.css` dengan nilai exact

### FASE 4 - KONTEN (TEKS)
- [x] 4a. Ekstrak seluruh teks dari DOM huruf demi huruf ke `/content/site.ts` & cek silang dengan daftar referensi

### FASE 5 - BANGUN STRUKTUR STATIS
- [x] 5a. Bangun komponen per section di `/components` (Header, Hero, Award Winning Work, Why Work With Me, Services, Awards, Client logos, Testimonials, FAQ, Footer)
- [x] 5b. Bandingkan tiap section di 4 viewport memakai `pixelmatch` (target diff < 1%, maks 5 iterasi/section)

### FASE 6 - ANIMASI & INTERAKSI
- [x] 6a. Tulis `/docs/animations.md` (tabel lengkap tiap animasi & interaksi beserta bukti)
- [x] 6b. Implementasikan animasi dengan GSAP (`useGSAP` / `useLayoutEffect` + `gsap.context`), Lenis smooth scroll, modal "Get in Touch", hover effects, and Web Audio StringLine
- [x] 6c. Verifikasi frame vs video referensi di titik waktu/scroll yang sama & uji interaksi Playwright

### FASE 7 - RESPONSIVE, METADATA, QA
- [x] 7a. Verifikasi layout di semua breakpoint termasuk intermediate (1280, 1100, 900, 600)
- [x] 7b. Implementasi metadata (title, description, OG, Twitter card dengan aset lokal)
- [x] 7c. Pixel diff final tiap 400px scroll x 4 viewport di `/docs/diff-report.md`
- [x] 7d. Evaluasi Lighthouse (Performance + Accessibility) dibanding target

