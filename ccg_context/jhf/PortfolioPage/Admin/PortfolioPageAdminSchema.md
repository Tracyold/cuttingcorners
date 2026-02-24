# AdminPortfolioPage -- Emergent Build Spec

## Auth

- Admin only -- verify `is_admin()` on load
- Part of the admin shell -- same sidebar as AdminProductsPage

## Reference

- Follow the same shell, sidebar, CSS design system, and component patterns as `adminproductspage_2.tsx`
- Same fonts: Cormorant (serif) + DM Sans (sans)
- Same color variables: `--k0` through `--k4`, `--g`, `--gl`, `--ln`, etc.
- Same tab, modal overlay, queue panel, and form panel patterns

-----

## Required SQL -- Run Before Building

```sql
-- Add new columns to portfolio_photos
ALTER TABLE portfolio_photos ADD COLUMN year        TEXT;
ALTER TABLE portfolio_photos ADD COLUMN description TEXT;
ALTER TABLE portfolio_photos ADD COLUMN archived    BOOLEAN NOT NULL DEFAULT FALSE;

-- Indexes
CREATE INDEX idx_portfolio_archived ON portfolio_photos(archived);
```

> Note: `year` is TEXT not INTEGER -- allows admin to type "2024" freely without numeric validation edge cases.

-----

## Storage Bucket

- Bucket name: `portfolio-photos`
- Public: **YES** -- photos must be publicly accessible for the PortfolioPage to render them without signed URLs
- Allowed MIME types: image/jpeg, image/png, image/tiff, image/x-adobe-dng, image/heic
- Max file size: 25MB

> Create in Supabase Dashboard → Storage → New bucket → name: `portfolio-photos` → Public: ON

-----

## Shell & Sidebar

- Same NAV_ITEMS as AdminProductsPage
- Active nav item: `portfolio`
- Page title: "Portfolio"
- Top right buttons: `Select` toggle + `+ Add Photos` gold button

-----

## Main View -- Photo Grid

Two-column grid of photo cards. No table layout.

### Photo Card

- Square thumbnail (1:1 aspect ratio), `object-fit: cover`
- No border-radius -- sharp corners
- **Top left overlay:** sort order number (inline editable -- see below)
- **Top right overlay:** published dot -- gold when published, dim when draft
- **Bottom overlay strip:**
  - Year -- gold, Cormorant serif, left-aligned
  - Caption -- dim, DM Sans, left-aligned, truncated
- **Hover actions:** Edit button + Archive button (appear on hover)

### Tabs

- **Published** -- `published = true AND archived = false`
- **Drafts** -- `published = false AND archived = false`
- **Archived** -- `archived = true`

-----

## Sort Order -- Inline Edit

- Click the sort number on any card -- input appears in place
- Type desired position, press Enter or blur to confirm
- If that number is taken by another photo: swap their `sort_order` values
- If not taken: just update this photo
- Batch UPDATE both affected rows in Supabase
- No drag and drop -- number-only repositioning
- Archived tab: sort badge is hidden (read-only view)

-----

## Add Photos Modal (Queue Pattern)

Same overlay pattern as AdminProductsPage.

### Left Panel -- Queue

- Header: "Queue (X/10)"
- Each item shows: thumbnail preview, caption or "(New Photo)", Unsaved / Draft saved status
- `+ Add Another` button -- disabled at 10

### Right Panel -- Form Fields

1. **Photo** -- toggle mode (same `gmb` button style as GIA section in products):
- **Upload** -- file picker, accept `.jpg,.jpeg,.png,.tiff,.tif,.dng,.heic`, max 25MB, upload to `portfolio-photos` bucket, store path as `photo_url`
- **URL** -- text input for external image URL, store as `photo_url`
- Show preview thumbnail once loaded in either mode
1. **Year** -- text input (optional)
- Placeholder: "e.g. 2024"
- 4-character max
- This is the gold title shown below each thumbnail on the public PortfolioPage
- Font on public site: Cormorant serif, gold `#d4af37`
1. **Caption** -- text input (optional)
- Placeholder: "e.g. Kashmir Sapphire Collection"
- Shown below the year on public PortfolioPage in smaller dim text
1. **Description** -- textarea (optional)
- Placeholder: "Additional details about this piece or collection…"
- Min height: 80px
- Shown on PortfolioPage when user clicks/expands a photo (if detail view is implemented)
1. **Sort Order** -- number input (optional)
- Placeholder: "Leave blank to append at end"
- Auto-assigns next available position if blank

**Read-only fields (same as products):**

- Photo ID
- Date created
- Time created

**Footer buttons:**

- `Archive` (edit mode only) -- soft delete
- `Save Draft` / `Save Drafts` -- `published = false`
- `Next →` -- when not on last queue item
- `Publish` / `Publish All (X)` -- `published = true`

**Auto-save every 15 seconds** -- same `✓ Saved` flash indicator

-----

## Edit Photo Modal

- Single item in queue
- All fields editable: photo, year, caption, description, sort order
- No auto-publish -- changes only go live after explicit Publish click
- Archive button in footer footer

-----

## Archive (Soft Delete)

- Sets `archived = true`, `published = false`
- Photo disappears from Published and Drafts tabs
- Visible only in Archived tab -- read-only, no restore, no edit
- Available on card hover AND inside edit modal footer

-----

## Bulk Actions

- Select mode toggle in page header
- Checkbox replaces sort number on each card when active
- Bulk action bar appears when 1+ items selected:
  - **Publish** -- `published = true`
  - **Unpublish** -- `published = false`
  - **Archive** -- `archived = true, published = false`
  - **Cancel** -- exits select mode

-----

## Supabase Queries

### Load

```javascript
const { data: photos } = await supabase
  .from('portfolio_photos')
  .select('*')
  .order('sort_order', { ascending: true })
// Filter client-side by tab
```

### Insert

```javascript
await supabase.from('portfolio_photos').insert({
  photo_url: photoUrl,
  year: year || null,
  caption: caption || null,
  description: description || null,
  sort_order: sortOrder,
  published: false,
  archived: false
})
```

### Publish

```javascript
await supabase.from('portfolio_photos')
  .update({ published: true })
  .eq('portfolio_photo_id', id)
```

### Archive

```javascript
await supabase.from('portfolio_photos')
  .update({ archived: true, published: false })
  .eq('portfolio_photo_id', id)
```

### Swap Sort Order

```javascript
// Photo A moves to position currently held by Photo B -- swap:
await supabase.from('portfolio_photos')
  .update({ sort_order: photoB.sort_order })
  .eq('portfolio_photo_id', photoA.portfolio_photo_id)

await supabase.from('portfolio_photos')
  .update({ sort_order: photoA.sort_order })
  .eq('portfolio_photo_id', photoB.portfolio_photo_id)
```

-----

## Public PortfolioPage Display Reference

Each card on the public site shows:

- Square thumbnail
- **Year** -- gold `#d4af37`, Cormorant serif, below thumbnail left -- this is why year is required
- **Caption** -- smaller dim text below year
- Description shown on expand/detail if implemented

-----

## Notes for Emergent

- Follow `adminproductspage_2.tsx` exactly for shell, sidebar, CSS variables, modal, queue, and form patterns
- `year`, `description`, and `archived` were added via ALTER TABLE -- run the SQL above before building
- `year` is TEXT -- no numeric enforcement needed, admin types freely
- Year is the primary visible label on the public portfolio -- treat it as the title field
- Archive is permanent from the UI -- no restore
- Upload and URL are toggle modes inside the same photo field -- same `gmb` pattern as GIA section
- Public PortfolioPage queries `portfolio_photos` where `published = true AND archived = false`
- Do NOT trigger user notifications or SMS on portfolio publish -- products only
