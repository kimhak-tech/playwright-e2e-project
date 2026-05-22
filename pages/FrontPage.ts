import { test, Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class FrontPage extends BasePage {

    // ─────────────────────────────────────────────
    // Locators — Header
    // ─────────────────────────────────────────────
    readonly navbar: Locator;
    readonly logo: Locator;
    readonly navbarToggler: Locator;
    readonly navbarMenu: Locator;
    readonly navRooms: Locator;
    readonly navBooking: Locator;
    readonly navAmenities: Locator;
    readonly navLocation: Locator;
    readonly navContact: Locator;
    readonly navAdmin: Locator;

    // ─────────────────────────────────────────────
    // Locators — Welcome Banner
    // ─────────────────────────────────────────────
    readonly heroHeading: Locator;
    readonly heroDescription: Locator;
    readonly heroBookNowBtn: Locator;

    // ─────────────────────────────────────────────
    // Locators — Booking
    // ─────────────────────────────────────────────
    readonly bookingSection: Locator;
    readonly checkInInput: Locator;
    readonly checkOutInput: Locator;
    readonly checkAvailabilityBtn: Locator;

    // ─────────────────────────────────────────────
    // Locators — Rooms
    // ─────────────────────────────────────────────
    readonly roomsSection: Locator;
    readonly roomCards: Locator;

    // ─────────────────────────────────────────────
    // Locators — Location
    // ─────────────────────────────────────────────
    readonly locationSection: Locator;
    readonly locationMap: Locator;
    readonly locationMapMarker: Locator;

    // ─────────────────────────────────────────────
    // Locators — Contact
    // ─────────────────────────────────────────────
    readonly contactSection: Locator;
    readonly contactNameInput: Locator;
    readonly contactEmailInput: Locator;
    readonly contactPhoneInput: Locator;
    readonly contactSubjectInput: Locator;
    readonly contactMessageInput: Locator;
    readonly contactSubmitBtn: Locator;
    readonly contactSuccessMessage: Locator;
    readonly contactErrorMessages: Locator;

    // ─────────────────────────────────────────────
    // Locators — Footer
    // ─────────────────────────────────────────────
    readonly footer: Locator;
    readonly footerCookiePolicy: Locator;
    readonly footerPrivacyPolicy: Locator;
    readonly footerFacebook: Locator;
    readonly footerInstagram: Locator;
    readonly footerTwitter: Locator;

    constructor(page: Page) {
        super(page);

        // Header
        this.navbar        = page.locator('nav.navbar');
        this.logo          = page.locator('.navbar-brand');
        this.navbarToggler = page.locator('.navbar-toggler');
        this.navbarMenu    = page.locator('#navbarNav');

        // Nav links scoped to #navbarNav to avoid matching footer's Quick Links
        const navMenu     = page.locator('#navbarNav');
        this.navRooms     = navMenu.getByRole('link', { name: 'Rooms' });
        this.navBooking   = navMenu.getByRole('link', { name: 'Booking' });
        this.navAmenities = navMenu.getByRole('link', { name: 'Amenities' });
        this.navLocation  = navMenu.getByRole('link', { name: 'Location' });
        this.navContact   = navMenu.getByRole('link', { name: 'Contact' });
        this.navAdmin     = navMenu.getByRole('link', { name: 'Admin' });

        // Welcome Banner
        this.heroHeading     = page.locator('.hero').getByRole('heading', { level: 1 });
        this.heroDescription = page.locator('.hero .lead');
        this.heroBookNowBtn  = page.getByRole('link', { name: 'Book Now' });

        // Booking
        this.bookingSection       = page.locator('#booking');
        this.checkInInput         = page.locator('.react-datepicker__input-container input').first();
        this.checkOutInput        = page.locator('.react-datepicker__input-container input').last();
        this.checkAvailabilityBtn = page.getByRole('button', { name: 'Check Availability' });

        // Rooms
        this.roomsSection = page.locator('#rooms');
        this.roomCards    = page.locator('#rooms .room-card');

        // Location
        this.locationSection   = page.locator('#location');
        this.locationMap       = page.locator('.pigeon-tiles-box');
        this.locationMapMarker = page.locator('.pigeon-click-block svg');

        // Contact
        this.contactSection      = page.locator('#contact');
        this.contactNameInput    = page.getByTestId('ContactName');
        this.contactEmailInput   = page.getByTestId('ContactEmail');
        this.contactPhoneInput   = page.getByTestId('ContactPhone');
        this.contactSubjectInput = page.getByTestId('ContactSubject');
        this.contactMessageInput = page.getByTestId('ContactDescription');
        this.contactSubmitBtn    = page.locator('#contact').getByRole('button', { name: 'Submit' });
        this.contactSuccessMessage = page.locator('#contact .card-body').filter({ hasText: 'Thanks for getting in touch' });
        this.contactErrorMessages  = page.locator('#contact .alert-danger');

        // Footer
        this.footer              = page.locator('footer');
        this.footerCookiePolicy  = page.getByRole('link', { name: 'Cookie-Policy' });
        this.footerPrivacyPolicy = page.getByRole('link', { name: 'Privacy-Policy' });
        this.footerFacebook      = page.locator('footer .bi-facebook').locator('..');
        this.footerInstagram     = page.locator('footer .bi-instagram').locator('..');
        this.footerTwitter       = page.locator('footer .bi-twitter').locator('..');
    }

    // ─────────────────────────────────────────────
    // Actions — Navigation
    // ─────────────────────────────────────────────
    async goto() {
        await test.step('Go to Front Page', async () => {
            await this.page.goto('/');
        });
    }

    async clickLogo() {
        await test.step('Click logo', async () => {
            await this.logo.click();
        });
    }

    async clickNavRooms() {
        await test.step('Click "Rooms" nav link', async () => {
            await this.navRooms.click();
        });
    }

    async clickNavBooking() {
        await test.step('Click "Booking" nav link', async () => {
            await this.navBooking.click();
        });
    }

    async clickNavAmenities() {
        await test.step('Click "Amenities" nav link', async () => {
            await this.navAmenities.click();
        });
    }

    async clickNavLocation() {
        await test.step('Click "Location" nav link', async () => {
            await this.navLocation.click();
        });
    }

    async clickNavContact() {
        await test.step('Click "Contact" nav link', async () => {
            await this.navContact.click();
        });
    }

    async clickNavAdmin() {
        await test.step('Click "Admin" nav link', async () => {
            await this.navAdmin.click();
        });
    }

    async toggleHamburgerMenu() {
        await test.step('Toggle hamburger menu', async () => {
            await this.navbarToggler.click();
        });
    }
    
    async isNavbarMenuCollapsed() {
        await test.step('Wait for navbar menu to collapse', async () => {
            // Wait for collapsing animation to finish first
            await expect(this.navbarMenu).not.toHaveClass(/collapsing/);
            // Then confirm show class is gone
            await expect(this.navbarMenu).not.toHaveClass(/show/);
        });
    }

    // ─────────────────────────────────────────────
    // Actions — Booking
    // ─────────────────────────────────────────────
    async setCheckInDate(date: string) {
        await test.step(`Set check-in date to ${date}`, async () => {
            await this.checkInInput.fill(date);
        });
    }

    async setCheckOutDate(date: string) {
        await test.step(`Set check-out date to ${date}`, async () => {
            await this.checkOutInput.fill(date);
        });
    }

    async clickCheckAvailability() {
        await test.step('Click Check Availability', async () => {
            await this.checkAvailabilityBtn.click();
        });
    }

    // ─────────────────────────────────────────────
    // Actions — Rooms
    // roomId used instead of type — unique per room,
    // prevents strict mode violations with duplicate types
    // ─────────────────────────────────────────────
    getRoomCard(roomId: number): Locator {
        return this.roomCards.filter({
            has: this.page.locator(`a[href*="/reservation/${roomId}"]`)
        });
    }

    async clickBookNow(roomId: number) {
        await test.step(`Click "Book now" for room ${roomId}`, async () => {
            await this.getRoomCard(roomId).getByRole('link', { name: 'Book now' }).click();
        });
    }

    // ─────────────────────────────────────────────
    // Actions — Contact
    // ─────────────────────────────────────────────
    async sendMessage(name: string, email: string, phone: string, subject: string, message: string) {
        await test.step(`Send contact message from "${name}"`, async () => {
            await this.contactNameInput.fill(name);
            await this.contactEmailInput.fill(email);
            await this.contactPhoneInput.fill(phone);
            await this.contactSubjectInput.fill(subject);
            await this.contactMessageInput.fill(message);
            await this.contactSubmitBtn.click();
        });
    }

    // ─────────────────────────────────────────────
    // Actions — Scroll
    // ─────────────────────────────────────────────
    async scrollToTop() {
        await test.step('Scroll to top of page', async () => {
            await this.page.evaluate(() => window.scrollTo(0, 0));
        });
    }

    async scrollDown(px: number = 1000) {
        await test.step(`Scroll down ${px}px`, async () => {
            await this.page.evaluate((px) => window.scrollTo(0, px), px);
        });
    }

}