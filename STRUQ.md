# STRUQ.md: ВЫДОХ

Mode: build
Stack: Next.js 16.4.6 (App Router) · React 19.3.0 · Tailwind 4.3.3 · GSAP 3.15.1 · Lenis 1.3.27 · Radix Dialog · @struq/icons 1.2.1 (majors read from package.json)

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
References: none supplied.

## BRAND
Name: ВЫДОХ (shortlist and rationale in brand/NAMING.md)
Logo: brand/logo.svg (wordmark, outlined), brand/mark.svg (mark, outlined)
      src/app/icon.svg (mark on surface tile)
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
Hero entrance: clip-line-hero (declared different: Cormorant has no SOFT axis for soft-scrub;
  the single clip wipe also serves the breath motif)
Palette: light · --surface-0 #FAF6EF --surface-1 #F2EBDF --surface-2 #E8DECE --surface-3 #DCCEB8
  --ink #1B1917 --ink-muted #5B544A --ink-faint #A79C8B (non-text only)
  --accent #2E5A45 (deep spruce; 4.9:1 on surface-0, may set links and large type)
  --line rgb(27 25 23 / 0.13)
Radius: 2px
Icons: Struq Icons, @struq/icons, strokeWidth 1.5, accent = --color-accent, states.css on
Imagery: none (type-led); grain 0.04 overlay; ratios reserved for the OG card only
Scroll: Lenis lerp 0.1 on gsap.ticker
Motion: baseline; deviation (Warm Editorial's declared editorial-calm): entrances power3.out
  0.7 to 0.9s; hero clip 1.6s power4.inOut; showpiece scrub 1

## PLAN
Pages: / (one-pager); anchors #method, #hours, #money, #price. Legal text lives in the footer.
Arc (home):
  1 HERO      [Hook]    h1 «Бросить курить без силы воли», cropped «ВЫДОХ» off the right edge
                        (grid-break 1), breath arc crosses the section, calm ring; 14rem
  2 MANIFESTO [Orient]  one statement alone in 18rem of air (breather)
  3 MOMENT    [Deepen]  the 14:40 insight as three hairline editorial rows + «Пережди пик»
                        craving button; dense 8rem
  4 72 HOURS  [Prove]   SHOWPIECE pin-scrub-timeline, 3 phases, one breath-arc meter filling;
                        mobile: stacked list, no pin; breathers 3 and 5 flank it
  5 MONEY     [Prove]   the calculator: money, cigarettes, days regained; big figures run wide
                        (grid-break 2); dense 8rem
  6 PRICE     [Invite]  editorial price list (free / Pro / year / companies), one row stepped up
                        on surface-2, no card grid; 8rem
  7 CLOSE     [Invite]  giant ask + honest email hand-off + footer; oversized wordmark cropped at
                        the bottom (grid-break 3); 14rem
  Proof form: the visitor's own arithmetic (calculator) + the sourced 72-hour milestones.
  Pacing: vast, breather, dense, showpiece, dense, dense, vast.
Reveals: h2s line-mask rise · rows and price lines transform + autoAlpha stagger 0.08 · no images
  · svg: the breath arc draws on scroll (DrawSVG)
Showpieces: pin-scrub-timeline at row 4 (1 total), mobile = stacked list (pinning-scrub.md §1 and §4)
System recipes: clip-line-hero, fullscreen-menu, draw-arc, craving-dialog breath loop
Transitions: none (one-pager) · loader none
WebGL: none
Copy budget: h1 5 words · eyebrows 1 to 3 · h2 ≤10 · body 2 to 4 sentences at 44 to 52ch ·
  CTAs 2 to 4 verb-first words · exactly one manifesto line
Assets to produce: none (type-led). OG image built from the system in src/app/opengraph-image.tsx.

## ASSUMPTIONS
- The brand name, wordmark and mark are generated. Trademark and domain availability are NOT verified.
- No customers, quotes, logos or outcome data exist, so none are shown. The only external numbers are
  CDC / NHS nicotine-clearance milestones and the BMJ 11-minutes-per-cigarette estimate, both labelled.
- Prices (490 ₽/month, 3 900 ₽/year, B2B on request) are a proposed offer, not a live checkout.
- No payment provider, CRM or email service is connected. The email CTA opens the visitor's mail client.
- The 2 1-day programme and the "craving" tool are product copy written for the brief, not medical advice.
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

## VERIFY
Server: pending
Viewports: 390, 768, 1440, 1920
Score: pending
Motion: pending
Open: payments, analytics, email delivery, real clinical review, trademark + domain check
