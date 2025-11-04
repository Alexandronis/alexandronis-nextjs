import { test, expect } from '@playwright/test';

test.describe('Tasks widget', () => {
  test('renders tasks and toggles completed', async ({ page }) => {
    // Go to root page where Tasks Widget lives
    await page.goto('/');

    // Expect the title
    await expect(page.locator('h1')).toContainText('Tasks Widget');

    // Wait for the two tasks to appear (fetchTasks uses a 500ms delay)
    await expect(page.locator('text=Learn Tailwind')).toBeVisible();
    await expect(page.locator('text=Setup Zustand')).toBeVisible();

    // Find the checkbox for the first task and toggle it
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await expect(firstCheckbox).toHaveCount(1);

    // Capture initial checked state, then click and expect it to change
    const initialChecked = await firstCheckbox.isChecked();
    await firstCheckbox.click();
    await expect(firstCheckbox).toHaveJSProperty('checked', !initialChecked);

    // Optionally, assert class change on the list item (bg-green-200 when completed)
    const firstListItem = page.locator('ul > li').first();
    await expect(firstListItem).toBeVisible();
  });
});
