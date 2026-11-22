# STRUQ.md: ВЫДОХ

Mode: build
Stack: Next.js 16.4.6 (App Router, static export `output: "export"`, served by `serve out`) · React 19.3.0 · Tailwind 4.3.3 · GSAP 3.15.1 · Lenis 1.3.27 · Radix Dialog · @struq/icons 1.2.1 (majors read from package.json)

## MATERIALS
Have: the brief (a site that helps people quit smoking, motivates them, and can carry a paid product).
Missing:
- Name and logo → generated here (brand/NAMING.md, brand/logo.svg, brand/mark.svg).
- Photography → none. The build is deliberately type-led; no stock, no generated people, no fake
  cigarette/product shots. The breath-arc SVG is the visual motif.
- Real testimonials, customer counts and outcomes → none. No proof faked. The only numbers used are
  public-health milestones (CDC / NHS) and the visitor's own arithmetic, both labelled.
- Payments / backend → not connected. Pricing is a real offer surface; checkout, analytics and email
  delivery are named as next steps, not simulated.
- Vape scope → cigarettes, vapes and e-cigarettes are first-class: the calculator has a vape mode
  (money + ml + bottles, no life-minutes claim), the 72-hour phases carry a vape note, and the copy
  names all three. No invented long-term vape outcome claims.
- Hosting → fully static `out/`; the free target is Cloudflare Pages. No Node server is required.
References: none supplied.

## BRAND
Name: ВЫДОХ (shortlist and rationale in brand/NAMING.md)
Logo: brand/logo.svg (live-type wordmark + the outlined mark; outline the wordmark from the licensed
      static file when the brand is registered), brand/mark.svg (mark, outlined),
      src/app/icon.svg (mark on surface tile), src/app/apple-icon.png
Voice: спокойно и по делу; короткие фразы; цифры вместо эпитетов; без восклицательных знаков,
       без «начни новую жизнь» и без нотаций. Never guilt, never "просто возьми себя в руки".

## CONCEPT
Idea: the site is a breathing room — it counts the air you win back, not the cigarettes you lose.
Tension: convince "this is a system for the exact minute you cave, and it pays you back in money
  and breath" / never signal "a preachy anti-smoking PSA, a clinical medical app, or a willpower cult".
Motif: one continuous breath-arc line that begins as cigarette smoke in the hero and straightens into
  a clean horizon as the page descends; the same arc returns in the 72-hour meter and the footer.

## SYSTEM
Niche: B2C consumer-health subscription, buyer = the smoker (plus a B2B wellness row)
  · genre Product launch · preset Warm Editorial
  · borrowed: TYPE from Luxury Minimal (Cormorant Garamond display) — Cyrillic constraint, see LOG
Display: Cormorant Garamond 300 (+ italic 300) (Google Fonts, OFL) · pairing S4 (adapted)
Text: Manrope 400 body / 500 eyebrow and UI (Google Fonts, OFL)
  · roles per S4: display 300 / -0.01 / 0.92; h2 300 / -0.005 / 1.04; h3 400 / 0 / 1.2;
    eyebrow 500 / 0.18 / 1.2; body 400 / 0 / 1.7; small 400 / 0.01 / 1.55;
    UI 500 / 0.06 / 1; numerals Manrope 400 tabular
  · display clamp clamp(3.25rem, 1.4rem + 7.8vw, 9rem), body 1.0625rem
Signature move: a cropped display — the hero word «ВЫДОХ» runs off the right canvas edge
Hero entrance: a static h1 (no clip, no split: the headline paints with the first CSS frame, never
  waits for hydration and never leaves a blank first screen) + the breath arc drawing itself +
  the eyebrow/lead/CTAs fading in at 0.35s. The cropped ghost is the signature move, not the entrance.
Palette: light · --surface-0 #FAF6EF --surface-1 #F2EBDF --surface-2 #E8DECE --surface-3 #DCCEB8
  --ink #1B1917 --ink-muted #5B544A --ink-faint #A79C8B (non-text only)
  --accent #2E5A45 (deep spruce; 7.32:1 on surface-0, may set links and large type)
  --line rgb(27 25 23 / 0.13)
Radius: 2px
Icons: Struq Icons, @struq/icons, strokeWidth 1.5, accent = --color-accent, states.css on
Imagery: none (type-led); grain 0.04 overlay; ratios reserved for the OG card only
Scroll: Lenis lerp 0.1 on gsap.ticker
Motion: baseline; deviation (Warm Editorial's declared editorial-calm): entrances power3.out
  0.7 to 0.9s; showpiece scrub 1; hero h1 static by decision (above); the one ambient mover is the
  CSS breath ring

## PLAN
Pages: / (one-pager); anchors #method, #hours, #money, #price. Legal text lives in the footer.
Arc (home):
  1 HERO      [Hook]    h1 «Бросить курить и парить», cropped «ВЫДОХ» off the right edge
                        (grid-break 1), breath arc crosses the section, calm ring; full svh,
                        8 to 10rem top air + the foot meta
  2 MANIFESTO [Orient]  one statement alone in 18rem of air (breather), naming cigarettes, vapes
                        and e-cigarettes
  3 MOMENT    [Deepen]  the 14:40 insight as four hairline editorial rows (пачка / кофе / балкон /
                        розетка) + «Пережди пик» craving button; dense 8rem
  4 72 HOURS  [Prove]   SHOWPIECE pin-scrub-timeline, 3 phases, one breath-arc meter filling;
                        each phase carries a «Для вейпа» note; mobile: stacked list, no pin;
                        rows 3 and 5 are dense, so the surface step and their 11rem / 9rem padding
                        are the act break
  5 MONEY     [Prove]   the calculator in two modes: cigarettes (money, cigarettes, days) and
                        vape (money, ml, bottles); big figures run wide (grid-break 2); dense 8rem
  6 PRICE     [Invite]  editorial price list (free / Pro / year / companies), one row stepped up
                        on surface-1, no card grid; 8rem
  7 CLOSE     [Invite]  giant ask + honest email hand-off + footer; oversized wordmark cropped at
                        the bottom (grid-break 3); 14rem
  Proof form: the visitor's own arithmetic (cigarettes or vape) + the sourced 72-hour milestones.
  Pacing: vast, breather, dense, showpiece, dense, dense, vast.
Reveals: h2s line-mask rise · rows and price lines transform + autoAlpha stagger 0.08 · no images
  · svg: the breath arc draws on scroll (DrawSVG)
Showpieces: pin-scrub-timeline at row 4 (1 total), 3 phases, ±80% masked swap, pin gate
  (min-width 1024 + min-height 700 + no-preference), mobile = stacked list (pinning-scrub.md §1 and §4)
System recipes: draw-arc, copy-fade, fullscreen-menu, craving-dialog breath loop, header hide/show
Transitions: none (one-pager) · loader none
WebGL: none
Copy budget: h1 4 words · eyebrows 1 to 3 · h2 ≤10 · body 2 to 4 sentences at 44 to 52ch ·
  CTAs 2 to 4 verb-first words · exactly one manifesto line
Assets to produce: none (type-led). OG image is a static 1200x630 PNG in
  src/app/opengraph-image.png (the live generator was removed for static export).

## ASSUMPTIONS
- The brand name, wordmark and mark are generated. Trademark and domain availability are NOT verified.
- No customers, quotes, logos or outcome data exist, so none are shown. The only external numbers are
  CDC / NHS nicotine-clearance milestones and the BMJ 11-minutes-per-cigarette estimate, both labelled.
- Prices (490 ₽/month, 3 900 ₽/year, B2B on request) are a proposed offer, not a live checkout.
- No payment provider, CRM or email service is connected. The email CTA opens the visitor's mail client.
- The 21-day programme and the "craving" tool are product copy written for the brief, not medical advice.
- Vape copy: the 72-hour notes distinguish combustion (CO / tar) from aerosol; the vape calculator
  shows money, ml and bottles only, never a "life-minutes" claim. Long-term vape outcomes are
  described as still being studied.
- Language: Russian; product is 18+ and states it does not replace a doctor.
- One page for now; pricing, legal and account routes are reserved in the nav/footer copy.

## LOG
- 2026-11-23 Stack: scaffold reported Next 16.4.6, React 19.3.0, Tailwind 4.3.3. Tailwind arrives
  through @tailwindcss/turbopack in this scaffold; the CSS entry stays `@import "tailwindcss"`.
- 2026-11-23 Type: S4's Jost has no Cyrillic, and S2's Fraunces has none either. The display face is
  Cormorant Garamond (Cyrillic, S4) and the text face is Manrope (Cyrillic, S5's partner). Recorded as a
  language adaptation of S4, not a silent swap.
- 2026-11-23 Motion: no Motion/framer package installed; nothing on the page needs React layout animation.
- 2026-11-23 WebGL: none planned; the motif is SVG (DrawSVG), so three/R3F are deliberately absent.
- 2026-11-23 Hero: a clip wipe / SplitText rise was tried first and left the h1 hidden for about a
  second while the CSS/JS settled (measured in the frame trace). The h1 is now static; the entrance is
  the arc, the copy fade and the breathing ring. The first paint contains the headline.
- 2026-11-23 OG image: the Google variable TTF is CFF2 and Satori threw on it. Switched to two static
  Fontsource WOFF subsets of the same face (Cyrillic + Latin) with a font stack; the route returns
  1200x630 image/png.
- 2026-11-23 IDs: the calculator's price range had id="price", colliding with the pricing section
  anchor. Renamed to price-range; the menu link now lands on the price section.
- 2026-11-23 Pin: phases use a masked vertical swap (±80%) and the section has overflow-hidden only
  in rig mode, so the reduced-motion/touch/no-JS stack is never clipped.
- 2026-11-23 Scope: cigarettes + vapes + e-cigarettes. The calculator gained a two-mode toggle; the
  72-hour showpiece gained a vape note per phase; the manifesto, hero, metadata and OG name all
  three. No invented vape life-minutes.
- 2026-11-23 Hosting: switched to `output: "export"` (static `out/`). The OG route became a static
  1200x630 PNG; sitemap/robots got `dynamic = "force-static"`; `npm start` now serves `out/` on
  :3100. The VPS/Docker kit was removed.
- 2026-11-23 GitHub Pages: source repo Yakutc/vydoh, built output on `gh-pages` with
  `NEXT_PUBLIC_BASE_PATH=/vydoh` and `.nojekyll`. `metadataBase` is the origin only (Next appends
  basePath to the OG/icon paths); the canonical is absolute `SITE_URL`. Free URL:
  https://yakutc.github.io/vydoh/

## VERIFY
Server: static export (`out/`, 53 files, 1.53 MB); GitHub Pages branch `gh-pages` with `.nojekyll`;
  local preview `serve out` on :3100; no Node runtime
Hosting: https://yakutc.github.io/vydoh/ · repo Yakutc/vydoh (main = source, gh-pages = built site)
  · live HTTP 200 · canonical/OG/sitemap use the /vydoh base path · sitemap, robots and 404 verified
  · check-vape and interact pass on the live URL · OG 1200x630 at /vydoh/opengraph-image.png
Viewports: 390, 768, 1440, 1920
Score: 92/100
  LCP 1.43s desktop / 1.45s mobile on the live Pages URL (desktop: the cropped «ВЫДОХ» span;
  mobile: the hero lead paragraph; CLS 0.010 / 0.000; INP: field data pending). First-load JS
  250.4 kB gzip, 10 scripts, three.js absent. ESLint clean; build green; static build green.
  Layout: one h1, heading order valid, no horizontal overflow at 390/768/1440/1920.
  Motion: pin slow/fast/back tested (top locked at 0, data-mode=rig), vape notes fit the 24rem
  phase stage, reduced-motion stack readable, touch/no-JS readable, descender test «Gyp, jq.» whole,
  menu link scrolls to #price with no scroll lock, craving dialog opens/closes and the page scrolls.
  Calculator: both modes tested (cigarettes 314 813 ₽ → vape 319 375 ₽; 9 125 ml; 913 bottles).
  SEO: title/description/canonical/OG/Twitter name cigarettes + vapes; static OG 1200x630 returns
  200; sitemap + robots; JSON-LD Organization + WebSite.
  Contrast: ink 16.27:1, muted 6.93:1, accent 7.32:1 on surface-0; muted 4.82:1 on surface-3.
Open: payments, analytics, email delivery, clinical review, trademark/domain check; a custom domain
  can replace the github.io URL by setting NEXT_PUBLIC_SITE_URL and rebuilding; the showpiece could
  use one more breather section before the pin on very long screens.
