import { test, expect } from '../../fixtures/frontpage-fixture';
import { FrontPage } from '../../pages/FrontPage';

test.describe('Header Navigation', () => {
    let frontPage: FrontPage;

    test.beforeEach(async ({ page }) => {
        frontPage = new FrontPage(page);
        await frontPage.goto();
    });

    // ─────────────────────────────────────────────
    // Logo
    // ─────────────────────────────────────────────
    test.describe('Logo', () => {
        test('should display the logo with the name from API', async ({ branding }) => {
            await expect(frontPage.logo).toBeVisible();
            await expect(frontPage.logo).toContainText(branding.name);
        });

        test('should navigate to homepage when logo is clicked', async ({ page }) => {
            await frontPage.clickLogo();
            await expect(page).toHaveURL('/');
        });
    });

    // ─────────────────────────────────────────────
    // Nav Links — Visibility & Href
    // ─────────────────────────────────────────────
    test.describe('Nav Links', () => {
        test('should display all nav links', async () => {
            await expect(frontPage.navRooms).toBeVisible();
            await expect(frontPage.navBooking).toBeVisible();
            await expect(frontPage.navAmenities).toBeVisible();
            await expect(frontPage.navLocation).toBeVisible();
            await expect(frontPage.navContact).toBeVisible();
            await expect(frontPage.navAdmin).toBeVisible();
        });

        test('nav links should have correct hrefs', async () => {
            await expect(frontPage.navRooms).toHaveAttribute('href', '/#rooms');
            await expect(frontPage.navBooking).toHaveAttribute('href', '/#booking');
            await expect(frontPage.navAmenities).toHaveAttribute('href', '/#amenities');
            await expect(frontPage.navLocation).toHaveAttribute('href', '/#location');
            await expect(frontPage.navContact).toHaveAttribute('href', '/#contact');
            await expect(frontPage.navAdmin).toHaveAttribute('href', '/admin');
        });
    });

    // ─────────────────────────────────────────────
    // Nav Links — Click & Scroll Behavior
    // ─────────────────────────────────────────────
    test.describe('Nav Links scroll behavior', () => {
        test('clicking "Rooms" should scroll to rooms section', async ({ page }) => {
            await frontPage.clickNavRooms();
            await expect(page.locator('#rooms')).toBeInViewport();
        });

        test('clicking "Booking" should scroll to booking section', async ({ page }) => {
            await frontPage.clickNavBooking();
            await expect(page.locator('#booking')).toBeInViewport();
        });

        test('clicking "Location" should scroll to location section', async ({ page }) => {
            await frontPage.clickNavLocation();
            await expect(page.locator('#location')).toBeInViewport();
        });

        test('clicking "Contact" should scroll to contact section', async ({ page }) => {
            await frontPage.clickNavContact();
            await expect(page.locator('#contact')).toBeInViewport();
        });

        test('clicking "Admin" should navigate to admin page', async ({ page }) => {
            await frontPage.clickNavAdmin();
            await expect(page).toHaveURL(/\/admin/);
        });
    });

    // ─────────────────────────────────────────────
    // Sticky Header
    // ─────────────────────────────────────────────
    test.describe('Sticky Header', () => {
        test('should remain visible after scrolling down', async () => {
            await frontPage.scrollDown(1000);
            await expect(frontPage.navbar).toBeInViewport();
        });
    });

    // ─────────────────────────────────────────────
    // Responsive — Mobile Hamburger
    // ─────────────────────────────────────────────
    test.describe('Responsive Hamburger Menu', () => {
        test.use({ viewport: { width: 375, height: 812 } });

        test('should show hamburger button on mobile', async () => {
            await expect(frontPage.navbarToggler).toBeVisible();
        });

        test('nav links should be hidden by default on mobile', async () => {
            await expect(frontPage.navbarMenu).not.toBeVisible();
        });

        test('nav links should appear after clicking hamburger', async () => {
            await frontPage.toggleHamburgerMenu();
            await expect(frontPage.navbarMenu).toBeVisible();
        });

        test('nav links should collapse after clicking hamburger again', async () => {
            await frontPage.toggleHamburgerMenu();
        
            // Wait for menu to fully open before clicking again
            await expect(frontPage.navbarMenu).toHaveClass(/show/);
        
            await frontPage.toggleHamburgerMenu();
            await frontPage.isNavbarMenuCollapsed();
        });
    });

});