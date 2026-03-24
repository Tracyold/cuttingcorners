import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/session.json' });

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/account');
});

test('account page loads', async ({ page }) => {
  await expect(page).toHaveURL(/account/);
});

test('nav tabs are visible', async ({ page }) => {
  await expect(page.locator('.acc-nav-item').first()).toBeVisible();
});

test('home tab loads', async ({ page }) => {
  await page.locator('.acc-nav-item', { hasText: 'Home' }).click();
  await expect(page.locator('.acc-content')).toBeVisible();
});

test('work orders tab loads', async ({ page }) => {
  await page.locator('.acc-nav-item', { hasText: 'Work Orders' }).click();
  await expect(page.locator('.acc-content')).toBeVisible();
});

test('inquiries tab loads', async ({ page }) => {
  await page.locator('.acc-nav-item', { hasText: 'Inquiries' }).click();
  await expect(page.locator('.acc-content')).toBeVisible();
});

test('wizard results tab loads', async ({ page }) => {
  await page.locator('.acc-nav-item', { hasText: 'Wizard Results' }).click();
  await expect(page.locator('.acc-content')).toBeVisible();
});

test('invoices tab loads', async ({ page }) => {
  await page.locator('.acc-nav-item', { hasText: 'Invoices' }).click();
  await expect(page.locator('.acc-content')).toBeVisible();
});

test('chat panel is visible', async ({ page }) => {
  await expect(page.locator('.acc-right')).toBeVisible();
});

test('chat input is visible', async ({ page }) => {
  await expect(page.locator('.acc-chat-input')).toBeVisible();
});

test('sign out button is visible', async ({ page }) => {
  await expect(page.locator('.acc-nav-item', { hasText: 'Sign Out' })).toBeVisible();
});

test('profile heading is visible by default', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /profile/i })).toBeVisible();
});
