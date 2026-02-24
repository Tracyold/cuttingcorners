# AdminLoginPage — Emergent Build Spec

*Canonical version — February 23, 2026*
*File: `Website/Admin/AdminLogin/AdminLogin.md`*

## Auth

- Admin logs in with **email + password** via Supabase Auth
- No OTP, no Twilio, no Cloudflare Turnstile
- On success: verify user exists in `admin_users` table by matching `admin_user_id` to `auth.user.id` — if not found, sign out and show error
- On success + verified: redirect to `/admin/dashboard`
- If already logged in as admin: redirect immediately to `/admin/dashboard`
- Route: `/admin` or `/admin/login`
- This route should not be linked anywhere on the public site — admin navigates to it directly by URL

-----

## Credentials

> **Setup:** Create the admin user in Supabase Dashboard → Authentication → Users → Add User.
> Do NOT add to any email service — admin login is email + password only, no verification email needed.
> Store production credentials in `.env` or Supabase secrets. **Never hardcode credentials in frontend code or commit them to version control.**

-----

## Layout

- Full screen centered — no nav bar, no footer
- Background: `#050505` with a very subtle radial gradient or noise texture for depth
- Single login card centered vertically and horizontally
- Card max-width: 480px
- Card style:
  - Background: `#111111`
  - Border: `0.5px solid rgba(214,180,70,0.55)`
  - Box shadow: animated gold glow — CSS keyframe slow breathing pulse: `0 0 40px rgba(214,180,70,0.08)` → `0 0 60px rgba(214,180,70,0.18)` → back, ~4 second loop
  - Border radius: none — sharp corners match the brand
  - Padding: 40px

-----

## Card Content

### Header

- Logo text: “CUTTING CORNERS GEMS” — Montserrat, 11px, `letter-spacing: 0.25em`, `rgba(255,255,255,0.55)`
- Title: “Admin” — Oranienbaum serif, 28px, white
- Subtitle: none — keep it minimal and private feeling

### Form Fields

**Email**

- Label: “EMAIL” — Montserrat, 11px, `letter-spacing: 0.2em`, `rgba(255,255,255,0.45)`
- Input style:
  - Background: `#0A0A0A`
  - Border: `1px solid rgba(255,255,255,0.10)`
  - Text color: `#d4af37` (gold)
  - Height: 40px
  - Padding: 10px
  - No border-radius
  - On focus: border transitions to `rgba(214,180,70,0.55)`, subtle gold glow `0 0 10px rgba(214,180,70,0.15)`
  - Transition: `border 200ms ease, box-shadow 200ms ease`

**Password**

- Label: “PASSWORD” — same style as EMAIL label
- Input style: same as email input
- Type: password
- Show/hide toggle: small eye icon at right edge of input, `rgba(255,255,255,0.35)`, toggles input type between `password` and `text`

### Error State

- If credentials wrong: small error message below password field
- Text: “Invalid email or password.” — Comfortaa, 12px, `rgba(255,80,80,0.85)`
- If email exists in auth but not in `admin_users` table: “Access denied.”
- No harsh red backgrounds — just subtle text error

### Submit Button

- Full width
- Label: “SIGN IN” — Montserrat, 11px, `letter-spacing: 0.3em`
- Style:
  - Background: transparent
  - Border: `1px solid rgba(214,180,70,0.9)`
  - Color: `#d4af37`
  - Box shadow: `0 0 14px rgba(214,180,70,0.35)`
  - Height: 44px
  - No border-radius
  - Hover: box shadow intensifies to `0 0 24px rgba(214,180,70,0.55)`, smooth 200ms transition
  - Active/press: `transform: scale(0.98)`
  - Loading state: button text changes to “…” and is disabled while auth call is in flight

-----

## Auth Logic

```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email:    formEmail,
  password: formPassword,
})

if (error) {
  setErrorMessage('Invalid email or password.')
  return
}

// Verify admin status — Supabase Auth session alone is not enough
// Match auth user ID directly against admin_users table
const { data: adminCheck } = await supabase
  .from('admin_users')
  .select('admin_user_id')
  .eq('admin_user_id', data.user.id)
  .single()

if (!adminCheck) {
  await supabase.auth.signOut()
  setErrorMessage('Access denied.')
  return
}

// Success — redirect to admin dashboard
router.push('/admin/dashboard')
```

> Note: the prose above mentions `is_admin()` as the verification method — ignore that, use the direct `admin_users` table query above. It achieves the same result and is cleaner for this context.

-----

## Animation Details

- On page load: card fades in with subtle upward drift — `opacity 0→1, translateY 12px→0`, 400ms ease-out
- Gold glow on card border breathes slowly in a loop — CSS keyframes preferred, no jarring flash
- Input focus glow is smooth and immediate — 200ms transition
- Button hover glow is smooth — 200ms transition
- Keep all animations subtle — this is a private internal page, not a marketing page

-----

## Mobile

- Card takes full width with 24px horizontal padding
- Same design, same glow — just narrower
- Keyboard-aware: form should not be obscured by mobile keyboard

-----

## Fonts

- Oranienbaum — “Admin” title
- Montserrat — labels, button
- Comfortaa — error messages

Load all three from Google Fonts.

-----

## Security Notes for Emergent

- Never log credentials to console
- Never expose admin route in public navigation
- Never hardcode credentials in frontend code or commit them to version control
- Always verify `admin_users` table after auth — Supabase Auth session alone is not sufficient
- Sign out immediately if admin check fails
- Credentials for setup reference only — store in `.env`, not in code