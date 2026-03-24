import { chromium } from '@playwright/test';
import * as readline from 'readline';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/admin/login');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  await new Promise<void>(resolve => {
    rl.question('Enter admin email: ', async (email) => {
      await page.locator('input[type="email"]').fill(email);
      resolve();
    });
  });

  await new Promise<void>(resolve => {
    rl.question('Enter admin password: ', async (password) => {
      await page.locator('input[type="password"]').fill(password);
      await page.getByRole('button', { name: /sign in|login|continue/i }).click();
      rl.close();
      resolve();
    });
  });

  await page.waitForURL(/dashboard/, { timeout: 10000 });
  await context.storageState({ path: 'tests/admin-session.json' });
  console.log('✓ Admin session saved to tests/admin-session.json');

  await browser.close();
  process.exit(0);
})();
