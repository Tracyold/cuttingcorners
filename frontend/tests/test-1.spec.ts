import { test, expect } from '@playwright/test';

test('shop page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/shop');
  await expect(page).toHaveURL(/shop/);
});
