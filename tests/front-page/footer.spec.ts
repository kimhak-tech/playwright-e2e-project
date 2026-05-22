import { test, expect } from '../../fixtures/frontpage-fixture';
import { FrontPage } from '../../pages/FrontPage';

test.describe('Footer', () => {
    let frontPage: FrontPage;

    test.beforeEach(async ({ page }) => {
        frontPage = new FrontPage(page);
        await frontPage.goto();
        await frontPage.scrollDown(9999);
    });

    // ─────────────────────────────────────────────
    // Visibility
    // ─────────────────────────────────────────────
    test.describe('Visibility', () => {
        test('should display the footer', async () => {
            await expect(frontPage.footer).toBeVisible();
        });
    });

    // ─────────────────────────────────────────────
    // Contact Info
    // ─────────────────────────────────────────────
    test.describe('Contact Info', () => {
        test('should display phone number from API', async ({ branding }) => {
            await expect(frontPage.footer).toContainText(branding.contact.phone);
        });

        test('should display email from API', async ({ branding }) => {
            await expect(frontPage.footer).toContainText(branding.contact.email);
        });

        test('should display address from API', async ({ branding }) => {
            await expect(frontPage.footer).toContainText(branding.address.line1);
            await expect(frontPage.footer).toContainText(branding.address.line2);
            await expect(frontPage.footer).toContainText(branding.address.postTown);
            await expect(frontPage.footer).toContainText(branding.address.county);
            await expect(frontPage.footer).toContainText(branding.address.postCode);
        });
    });

    // ─────────────────────────────────────────────
    // Quick Links
    // ─────────────────────────────────────────────
    test.describe('Quick Links', () => {
        const quickLinks = ['Home', 'Rooms', 'Booking', 'Contact'];

        for (const link of quickLinks) {
            test(`should display "${link}" quick link`, async () => {
                await expect(
                    frontPage.footer.getByRole('link', { name: link })
                ).toBeVisible();
            });
        }
    });

    // ─────────────────────────────────────────────
    // Social Media
    // ─────────────────────────────────────────────
    test.describe('Social Media Icons', () => {
        test('should display Facebook icon link', async () => {
            await expect(frontPage.footerFacebook).toBeVisible();
        });

        test('should display Instagram icon link', async () => {
            await expect(frontPage.footerInstagram).toBeVisible();
        });

        test('should display Twitter icon link', async () => {
            await expect(frontPage.footerTwitter).toBeVisible();
        });
    });

    // ─────────────────────────────────────────────
    // Policy Links
    // ─────────────────────────────────────────────
    test.describe('Policy Links', () => {
        test('Cookie-Policy link should have correct href', async () => {
            await expect(frontPage.footerCookiePolicy).toHaveAttribute('href', '/cookie');
        });

        test('Privacy-Policy link should have correct href', async () => {
            await expect(frontPage.footerPrivacyPolicy).toHaveAttribute('href', '/privacy');
        });
    });
});