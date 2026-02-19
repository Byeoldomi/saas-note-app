import { test, expect } from '@playwright/test';

test('dashboard page visual check', async ({ page }) => {
    await page.goto('/dashboard');

    // Sidebar
    await expect(page.getByText('All Notes')).toBeVisible();

    // Header
    // Using more specific locators to avoid ambiguity if needed, but placeholder is good
    await expect(page.getByPlaceholder('Search notes, tags...')).toBeVisible();
    await expect(page.getByText('New Note', { exact: true })).toBeVisible();

    // Content
    await expect(page.getByText('Welcome back, Alex!')).toBeVisible();

    // Note Cards
    await expect(page.getByText('Q4 Goals & Reflections')).toBeVisible();
    await expect(page.getByText('Project Alpha Sync')).toBeVisible();

    // Screenshot
    await page.screenshot({ path: 'dashboard-page.png', fullPage: true });
});
