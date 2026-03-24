import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByRole('heading', { name: /Cutting Corners/i })).toBeVisible();
});

test('nav links exist', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('.tnav-link', { hasText: 'Shop' })).toBeVisible();
});

test('login page has phone input', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await expect(page.locator('input[type="tel"]')).toBeVisible();
});

test('shop page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/shop');
  await expect(page).toHaveURL(/shop/);
});
