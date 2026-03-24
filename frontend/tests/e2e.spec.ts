import { test, expect, chromium } from '@playwright/test';

// ── Helpers ──────────────────────────────────────────────────
// Opens two browser contexts simultaneously:
// one as the account user, one as the admin
async function dualSession() {
  const browser     = await chromium.launch();
  const accountCtx  = await browser.newContext({ storageState: 'tests/session.json' });
  const adminCtx    = await browser.newContext({ storageState: 'tests/admin-session.json' });
  const accountPage = await accountCtx.newPage();
  const adminPage   = await adminCtx.newPage();
  return { browser, accountPage, adminPage };
}

// ── Chat: Account → Admin ────────────────────────────────────

test('account user sends message and admin sees it', async ({ }) => {
  const { browser, accountPage, adminPage } = await dualSession();

  // Account user goes to account page
  await accountPage.goto('http://localhost:3000/account');
  await accountPage.waitForURL(/account/);

  // Admin opens the first user in the user list
  await adminPage.goto('http://localhost:3000/admin/users');
  await adminPage.locator('.tbl tbody tr', { hasText: 'Tracy Young' }).click();
  await adminPage.waitForURL(/admin\/users\/.+/);

  // Expand collapsed chat widget
  await adminPage.locator('text=Chat · Tracy Young').click();
  await adminPage.waitForTimeout(500);

  const msg = `E2E test message ${Date.now()}`;
  await accountPage.locator('.acc-chat-input').fill(msg);
  await accountPage.locator('button', { hasText: '↑' }).click();

  await expect(adminPage.locator(`text=${msg}`)).toBeVisible({ timeout: 8000 });
  await browser.close();
});

// ── Chat: Admin → Account ────────────────────────────────────

test('admin sends message and account user sees it', async ({ }) => {
  const { browser, accountPage, adminPage } = await dualSession();

  await accountPage.goto('http://localhost:3000/account');
  await adminPage.goto('http://localhost:3000/admin/users');
  await adminPage.locator('.tbl tbody tr', { hasText: 'Tracy Young' }).click();
  await adminPage.waitForURL(/admin\/users\/.+/);

  const msg = `Admin reply ${Date.now()}`;
  await adminPage.locator('input[placeholder="Type a message..."]').fill(msg);
  await adminPage.locator('button', { hasText: '→' }).click();

  await expect(accountPage.locator(`text=${msg}`)).toBeVisible({ timeout: 8000 });
  await browser.close();
});

// ── Work Order Pipeline ──────────────────────────────────────

test('admin creates work order and account user sees it', async ({ }) => {
  const { browser, accountPage, adminPage } = await dualSession();

  await accountPage.goto('http://localhost:3000/account');
  await accountPage.locator('.acc-nav-item', { hasText: 'Work Orders' }).click();

  await adminPage.goto('http://localhost:3000/admin/users');
  await adminPage.locator('.tbl tbody tr', { hasText: 'Tracy Young' }).click();
  await adminPage.waitForURL(/admin\/users\/.+/);
  await adminPage.locator('button', { hasText: /work order/i }).click();
  await adminPage.locator('.btn-add', { hasText: /add work order/i }).click();

  await adminPage.locator('input').first().fill('E2E Test Service');
  await adminPage.locator('button', { hasText: /save|create|add/i }).first().click();

  await expect(accountPage.locator('text=E2E Test Service')).toBeVisible({ timeout: 8000 });
  await browser.close();
});

test('admin completes work order and status updates on account page', async ({ }) => {
  const { browser, accountPage, adminPage } = await dualSession();

  await accountPage.goto('http://localhost:3000/account');
  await accountPage.locator('.acc-nav-item', { hasText: 'Work Orders' }).click();
  await adminPage.goto('http://localhost:3000/admin/users');
  await adminPage.locator('.tbl tbody tr', { hasText: 'Tracy Young' }).click();
  await adminPage.waitForURL(/admin\/users\/.+/);
  await adminPage.locator('button', { hasText: /work order/i }).click();

  const completeBtn = adminPage.locator('.ab.pub', { hasText: 'Complete' }).first();
  if (await completeBtn.isVisible()) {
    await completeBtn.click();
    await expect(accountPage.locator('text=COMPLETE')).toBeVisible({ timeout: 8000 });
  }
  await browser.close();
});

test('admin cancels work order and account page updates', async ({ }) => {
  const { browser, accountPage, adminPage } = await dualSession();

  await accountPage.goto('http://localhost:3000/account');
  await accountPage.locator('.acc-nav-item', { hasText: 'Work Orders' }).click();
  await adminPage.goto('http://localhost:3000/admin/users');
  await adminPage.locator('.tbl tbody tr', { hasText: 'Tracy Young' }).click();
  await adminPage.waitForURL(/admin\/users\/.+/);
  await adminPage.locator('button', { hasText: /work order/i }).click();

  const cancelBtn = adminPage.locator('.ab.rem', { hasText: 'Cancel' }).first();
  if (await cancelBtn.isVisible()) {
    await cancelBtn.click();
    await expect(accountPage.locator('text=CANCELLED')).toBeVisible({ timeout: 8000 });
  }
  await browser.close();
});

// ── Inquiries: Account → Admin ───────────────────────────────

test('account user submits service request and admin sees it', async ({ }) => {
  const { browser, accountPage, adminPage } = await dualSession();

  await accountPage.goto('http://localhost:3000/account');
  await accountPage.locator('.acc-nav-item', { hasText: 'Inquiries' }).click();
  await accountPage.locator('.acc-tab', { hasText: 'Service Requests' }).click();
  await accountPage.locator('.acc-btn-gold', { hasText: /request|new/i }).first().click();
  await accountPage.locator('select').selectOption({ index: 1 });

  const desc = `E2E service request ${Date.now()}`;
  await accountPage.locator('textarea[placeholder*="Describe"]').fill(desc);
  await accountPage.locator('.acc-btn-gold', { hasText: /submit/i }).click();

  await adminPage.goto('http://localhost:3000/admin/users');
  await adminPage.locator('.tbl tbody tr', { hasText: 'Tracy Young' }).click();
  await adminPage.waitForURL(/admin\/users\/.+/);

  await expect(adminPage.locator(`text=${desc}`)).toBeVisible({ timeout: 8000 });
  await browser.close();
});

// ── Notifications ─────────────────────────────────────────────

test('admin dashboard shows notification rows', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/dashboard');
  await expect(page.locator('.notif-row, .empty-tx').first()).toBeVisible({ timeout: 5000 });
});

test('admin can mark all notifications read', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/dashboard');
  const markAll = page.locator('button', { hasText: /mark all read/i });
  if (await markAll.isVisible()) {
    await markAll.click();
    await expect(page.locator('.notif-dot')).toHaveCount(0, { timeout: 5000 });
  }
});