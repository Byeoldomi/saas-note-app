import { test, expect } from '@playwright/test';

test('pricing page visual check', async ({ page }) => {
    await page.goto('/pricing');

    // Header
    await expect(page.getByText('Simple, transparent pricing')).toBeVisible();

    // Cards - Simplified check
    await expect(page.getByRole('heading', { name: 'Free' })).toBeVisible();

    // Monthly/Yearly Toggle
    await expect(page.getByText('Monthly')).toBeVisible();

    // Trusted By - Simplified check
    await expect(page.getByText('Trusted by creative teams', { exact: false })).toBeVisible();

    // Screenshot
    await page.screenshot({ path: 'pricing-page.png', fullPage: true });
});
