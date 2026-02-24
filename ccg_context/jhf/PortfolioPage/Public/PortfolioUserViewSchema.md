# PortfolioPage — Emergent Build Spec

_Canonical version — February 23, 2026_
_File: `Website/PortfolioPage/Public/PortfolioUserView.md`_

## Auth

- Fully public — no auth required
- No admin controls on this page
- Admin manages portfolio via AdminPortfolioPage

---

## Required SQL (Run Before Building)

These columns were added via ALTER TABLE — run if not already present:

```sql
ALTER TABLE portfolio_photos ADD COLUMN year        TEXT;
ALTER TABLE portfolio_photos ADD COLUMN description TEXT;
ALTER TABLE portfolio_photos ADD COLUMN archived    BOOLEAN NOT NULL DEFAULT FALSE;
```

---

## Supabase Connection

### Reading Portfolio Photos

```javascript
const { data: photos } = await supabase
    .from("portfolio_photos")
    .select("*")
    .eq("published", true)
    .eq("archived", false)
    .order("sort_order", { ascending: true });
```

- Use the `anon` public key — no auth required
- Only show rows where `published = true AND archived = false`
- Order by `sort_order` ascending

### Photo URL Rendering

`photo_url` is stored in the `portfolio-photos` Supabase Storage bucket which is **public**. Render directly as `<img src={photo.photo_url} />` — no signed URL needed.

### Database Fields

| DB Column            | Type    | Notes                                                     |
| -------------------- | ------- | --------------------------------------------------------- |
| `portfolio_photo_id` | uuid    | Primary key                                               |
| `photo_url`          | text    | Required — public storage URL, render directly            |
| `year`               | text    | Optional — gold label shown below thumbnail, left-aligned |
| `caption`            | text    | Optional — dim text shown below year                      |
| `description`        | text    | Optional — shown in modal below caption                   |
| `sort_order`         | integer | Controls grid display order                               |
| `published`          | boolean | Only show where true                                      |
| `archived`           | boolean | Never show where true                                     |

---

## Page Layout

- Background: `#050505`
- Text: `#FAFAFA`
- Max width: `1200px`, centered
- Padding desktop: `48px`
- Padding mobile: `16px`

## Header

- Optional label above title: Montserrat, 11px, uppercase, `letter-spacing: 0.20em`, `rgba(255,255,255,0.52)`
- Page title “Portfolio”: Oranienbaum, `clamp(30px, 6vw, 60px)`, weight 400, `#FAFAFA`

## Grid

- 2 columns — desktop AND mobile
- Gap desktop: `22px`
- Gap mobile: `14px`
- Thumbnail aspect ratio: `1:1` (square)
- No categories, no filters, no sorting UI — just photos

---

## Thumbnail Card

### Structure

- Background behind image: `#0A0A0A` (visible while image loads)
- Border radius: `14px`
- Border: `1px solid rgba(255,255,255,0.06)`
- Overflow: hidden
- Shadow: `0 10px 30px rgba(0,0,0,0.55)`

### Image

- `object-fit: cover`
- `object-position: center`
- Full color always — no grayscale ever

### Permanent Vignette (always on)

- Inset shadow overlay: `inset 0 0 26px 12px rgba(0,0,0,0.60)`
- Always present — not part of the hover/tap effect

### Labels Below Thumbnail

Shown below each card, left-aligned:

- **Year** — from `year` field. Cormorant serif, 13px, gold `#d4af37`. This is the primary visible label — the year the gem was cut, entered manually by admin. Show nothing if null.
- **Caption** — from `caption` field. Montserrat or Comfortaa, 11px, `rgba(255,255,255,0.45)`, dim. Shown below year. Show nothing if null.

```
[photo thumbnail]
2023           ← year, gold, Cormorant serif
Kashmir Sapphire Collection  ← caption, dim, smaller
```

---

## Desktop Behavior (hover + click)

### Hover

- Thumbnail background transitions to black
- Caption appears over or below the image in teal `rgba(45,212,191,1)`
- Border lifts to `rgba(255,255,255,0.16)`
- Shadow lifts to `0 18px 48px rgba(0,0,0,0.65)`
- Subtle lift: `translateY(-2px)`
- Transition: `220ms ease-out`
- No grayscale — color stays on

### Click

- Opens photo modal

---

## Mobile Behavior (tap)

### Tap #1 (focus)

- Thumbnail background turns black
- Caption appears in teal `rgba(45,212,191,1)`
- Subtle border frame: `1px solid rgba(0,0,0,0.75)`
- Outer hairline: `1px solid rgba(255,255,255,0.10)`
- Shadow lifts: `0 16px 42px rgba(0,0,0,0.62)`
- Micro lift: `translateY(-1px)`, `180ms ease-out`
- Only ONE tile focused at a time — tapping another tile focuses that one and unfocuses the previous
- Tapping outside any tile clears focus

### Tap #2 (on same focused tile)

- Opens photo modal
- On modal close: tile returns to focused state

---

## Photo Modal

### Trigger

- Desktop: single click on thumbnail
- Mobile: second tap on focused thumbnail

### Layout

- Fixed overlay: `rgba(0,0,0,0.75)` — click/tap outside to close
- Modal surface: `#0A0A0A`
- Border: `1px solid rgba(255,255,255,0.10)`
- Border radius: `18px`
- Shadow: `0 28px 90px rgba(0,0,0,0.70)`
- Max width: `680px`
- Max height: `92vh`, scrollable
- Escape key closes modal
- Body scroll locked when modal open

### Content

- Large photo — full color, no filters, `object-fit: cover`
- **Year** below photo if present: Cormorant serif, gold `#d4af37`
- **Caption** below year if present: Comfortaa, gold `#d4af37`, slightly smaller
- **Description** below caption if present: Comfortaa, 13px, `line-height: 1.75`, `rgba(255,255,255,0.55)`
- Close button: top-right corner, circular, X icon

### Animation

- Open: `opacity 0→1`, `scale 0.985→1`, `220ms ease-out`
- Close: reverse, `180ms ease-out`

---

## Fonts Required

- Oranienbaum (Google Fonts) — page title
- Montserrat (Google Fonts) — labels
- Comfortaa (Google Fonts) — caption, description in modal
- Cormorant (Google Fonts) — year label below thumbnail and in modal

---

## Notes for Emergent

- No grayscale anywhere — portfolio is always full color
- No categories, no filters, no search — clean photo grid only
- `photo_url` is a public storage URL — render directly, no signed URL needed
- `year` is the primary label below each thumbnail — gold, Cormorant serif, left-aligned. Show nothing if null.
- `caption` is secondary dim text below the year. Show nothing if null.
- `description` only appears inside the modal — not shown on the grid
- Admin controls `year`, `caption`, `description`, `sort_order`, and `published` via AdminPortfolioPage
- Query filters both `published = true` AND `archived = false`
- Do not show archived photos under any circumstances
