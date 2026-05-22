import { test, expect } from '../../fixtures/frontpage-fixture';
import { FrontPage } from '../../pages/FrontPage';
import { Branding } from '../../utils/api-helpers';

test.describe('Location Section', () => {
    let frontPage: FrontPage;

    test.beforeEach(async ({ page }) => {
        frontPage = new FrontPage(page);
        await frontPage.goto();
        await frontPage.clickNavLocation();
    });

    // ─────────────────────────────────────────────
    // Visibility
    // ─────────────────────────────────────────────
    test.describe('Visibility', () => {
        test('should display the location section', async () => {
            await expect(frontPage.locationSection).toBeVisible();
        });
    });

    // ─────────────────────────────────────────────
    // Map
    // ─────────────────────────────────────────────
    test.describe('Map', () => {
        test('should display the map container', async () => {
            await expect(frontPage.locationMap).toBeVisible();
        });

        test('should display the location marker', async () => {
            await expect(frontPage.locationMapMarker).toBeVisible();
        });
    });

    // ─────────────────────────────────────────────
    // Address
    // ─────────────────────────────────────────────
    test.describe('Address', () => {
        const addressFields: (keyof Branding['address'])[] = [
            'line1', 'line2', 'postTown', 'county', 'postCode'
        ];

        for (const field of addressFields) {
            test(`should display ${field} from API`, async ({ branding }) => {
                await expect(frontPage.locationSection).toContainText(branding.address[field]);
            });
        }
    });

    // ─────────────────────────────────────────────
    // Contact Details
    // ─────────────────────────────────────────────
    test.describe('Contact Details', () => {
        const contactFields: (keyof Branding['contact'])[] = ['phone', 'email'];

        for (const field of contactFields) {
            test(`should display ${field} from API`, async ({ branding }) => {
                await expect(frontPage.locationSection).toContainText(branding.contact[field]);
            });
        }
    });

    // ─────────────────────────────────────────────
    // Directions
    // ─────────────────────────────────────────────
    test.describe('Directions', () => {
        test('should display getting here directions from API', async ({ branding }) => {
            await expect(frontPage.locationSection).toContainText(branding.directions);
        });
    });
});