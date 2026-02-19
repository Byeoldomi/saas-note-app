import { test, expect } from '@playwright/test';

test('landing page visual check', async ({ page }) => {
    await page.goto('/');

    // Header
    await expect(page.getByText('CloudNote', { exact: false }).first()).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'Features' }).first()).toBeVisible();

    // Hero
    await expect(page.getByText('Capture thoughts', { exact: false })).toBeVisible();

    // Testimonial
    await expect(page.getByText('Sarah Jenkins')).toBeVisible();

    // Screenshot for manual review
    await page.screenshot({ path: 'landing-page.png', fullPage: true });
});
