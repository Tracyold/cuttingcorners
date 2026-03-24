import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/admin-session.json' });

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/admin/dashboard');
});

// ── Layout & Navigation ──────────────────────────────────────

test('admin shell loads', async ({ page }) => {
  await expect(page.locator('.shell')).toBeVisible();
});

test('sidebar is visible', async ({ page }) => {
  await expect(page.locator('.sb')).toBeVisible();
});

test('sidebar brand shows CCG', async ({ page }) => {
  await expect(page.locator('.sb-name')).toContainText('Cutting Corners');
});

test('sidebar has all nav items', async ({ page }) => {
  await expect(page.locator('.ni', { hasText: 'Dashboard' })).toBeVisible();
  await expect(page.locator('.ni', { hasText: 'Products' })).toBeVisible();
  await expect(page.locator('.ni', { hasText: 'Portfolio' })).toBeVisible();
  await expect(page.locator('.ni', { hasText: 'User List' })).toBeVisible();
});

test('sidebar sign out button is visible', async ({ page }) => {
  await expect(page.locator('.sb-foot')).toBeVisible();
});

// ── Dashboard ────────────────────────────────────────────────

test('dashboard page loads', async ({ page }) => {
  await expect(page.locator('.ph-title')).toContainText('Dashboard');
});

test('dashboard stat cards are visible', async ({ page }) => {
  await expect(page.locator('.stat-card').first()).toBeVisible();
});

test('dashboard shows Items Sold stat', async ({ page }) => {
  await expect(page.locator('.stat-label', { hasText: 'Items Sold' })).toBeVisible();
});

test('dashboard shows Shop Revenue stat', async ({ page }) => {
  await expect(page.locator('.stat-label', { hasText: 'Shop Revenue' })).toBeVisible();
});

test('dashboard shows Work Orders Completed stat', async ({ page }) => {
  await expect(page.locator('.stat-label', { hasText: 'Work Orders Completed' })).toBeVisible();
});

test('dashboard shows Work Order Revenue stat', async ({ page }) => {
  await expect(page.locator('.stat-label', { hasText: 'Work Order Revenue' })).toBeVisible();
});

// ── Products ─────────────────────────────────────────────────

test('products page loads', async ({ page }) => {
  await page.locator('.ni', { hasText: 'Products' }).click();
  await expect(page.locator('.ph-title')).toContainText('Products');
});

test('products add button is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/products');
  await expect(page.locator('.btn-add')).toBeVisible();
});

test('products tabs are visible', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/products');
  await expect(page.locator('.tabs')).toBeVisible();
});

test('products table is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/products');
  await expect(page.locator('.tbl')).toBeVisible();
});

test('products add modal opens', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/products');
  await page.locator('.btn-add').click();
  await expect(page.locator('.ov')).toBeVisible();
});

test('products add modal closes', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/products');
  await page.locator('.btn-add').click();
  await page.locator('.xb').click();
  await expect(page.locator('.ov')).not.toBeVisible();
});

// ── Portfolio ────────────────────────────────────────────────

test('portfolio page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/portfolio');
  await expect(page.locator('.ph-title')).toContainText('Portfolio');
});

test('portfolio add button is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/portfolio');
  await expect(page.locator('.btn-add')).toBeVisible();
});

test('portfolio tabs are visible', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/portfolio');
  await expect(page.locator('.tabs')).toBeVisible();
});

test('portfolio published tab is active by default', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/portfolio');
  await expect(page.locator('.tab.on')).toContainText('Published');
});

test('portfolio draft tab switches', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/portfolio');
  await page.locator('.tab', { hasText: 'Drafts' }).click();
  await expect(page.locator('.tab.on')).toContainText('Drafts');
});

test('portfolio archived tab switches', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/portfolio');
  await page.locator('.tab', { hasText: 'Archived' }).click();
  await expect(page.locator('.tab.on')).toContainText('Archived');
});

test('portfolio add modal opens', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/portfolio');
  await page.locator('.btn-add').click();
  await expect(page.locator('.ov')).toBeVisible();
});

test('portfolio add modal closes', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/portfolio');
  await page.locator('.btn-add').click();
  await page.locator('.xb').click();
  await expect(page.locator('.ov')).not.toBeVisible();
});

// ── User List ────────────────────────────────────────────────

test('users page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/users');
  await expect(page.locator('.ph-title')).toContainText('User List');
});

test('users search input is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/users');
  await expect(page.locator('input[placeholder]')).toBeVisible();
});

test('users table is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/users');
  await expect(page.locator('.tbl')).toBeVisible();
});

test('users search filters results', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/users');
  const input = page.locator('input[placeholder]').first();
  await input.fill('zzznoresults');
  await expect(page.locator('.tbl tbody tr')).toHaveCount(0);
});

// ── Admin Login (unauthenticated) ────────────────────────────

test('admin login page has email input', async ({ browser }) => {
  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/admin/login');
  await expect(page.locator('input[type="email"]')).toBeVisible();
  await context.close();
});

test('admin login page has password input', async ({ browser }) => {
  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/admin/login');
  await expect(page.locator('input[type="password"], input[type="text"]').first()).toBeVisible();
  await context.close();
});
