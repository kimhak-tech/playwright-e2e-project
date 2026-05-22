import { test, expect } from '../../fixtures/frontpage-fixture';
import { FrontPage } from '../../pages/FrontPage';

test.describe('Welcome Banner', () => {
    let frontPage: FrontPage;

    test.beforeEach(async ({ page }) => {
        frontPage = new FrontPage(page);
        await frontPage.goto();
    });

    // ─────────────────────────────────────────────
    // Visibility
    // ─────────────────────────────────────────────
    test.describe('Visibility', () => {
        test('should display hotel name as heading from API', async ({ branding }) => {
            await expect(frontPage.heroHeading).toBeVisible();
            await expect(frontPage.heroHeading).toContainText(branding.name);
        });

        test('should display description from API', async ({ branding }) => {
            await expect(frontPage.heroDescription).toContainText(branding.description);
        });

        test('should display the "Book Now" button', async () => {
            await expect(frontPage.heroBookNowBtn).toBeVisible();
        });
    });

    // ─────────────────────────────────────────────
    // Behaviour
    // ─────────────────────────────────────────────
    test.describe('Behaviour', () => {
        test('clicking "Book Now" should scroll to the booking section', async () => {
            await frontPage.heroBookNowBtn.click();
            await expect(frontPage.bookingSection).toBeInViewport();
        });
    });
});