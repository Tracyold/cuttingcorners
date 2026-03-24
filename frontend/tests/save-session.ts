import { chromium } from '@playwright/test';
import * as readline from 'readline';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/login');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Enter phone number
  await new Promise<void>(resolve => {
    rl.question('Enter your phone number (e.g. +15551234567): ', async (phone) => {
      await page.locator('input[type="tel"]').fill(phone);
      await page.getByRole('button', { name: /send|continue/i }).click();
      resolve();
    });
  });

  // Enter OTP
  await new Promise<void>(resolve => {
    rl.question('Enter the OTP code you received: ', async (otp) => {
      await page.locator('input[type="text"]').fill(otp);
      await page.getByRole('button', { name: /verify|confirm|submit/i }).click();
      rl.close();
      resolve();
    });
  });

  await page.waitForURL(/account/);
  await context.storageState({ path: 'tests/session.json' });
  console.log('✓ Session saved to tests/session.json');

  await browser.close();
  process.exit(0);
})();
