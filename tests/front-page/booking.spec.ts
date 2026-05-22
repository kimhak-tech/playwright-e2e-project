import { test, expect } from '../../fixtures/frontpage-fixture';
import { FrontPage } from '../../pages/FrontPage';
import { getToday, getTomorrow, getFutureDate } from '../../utils/date-helpers';

test.describe('Booking Section', () => {
    let frontPage: FrontPage;

    test.beforeEach(async ({ page }) => {
        frontPage = new FrontPage(page);
        await frontPage.goto();
        await frontPage.clickNavBooking();
    });

    // ─────────────────────────────────────────────
    // Visibility
    // ─────────────────────────────────────────────
    test.describe('Visibility', () => {
        test('should display the booking section', async () => {
            await expect(frontPage.bookingSection).toBeVisible();
        });

        test('should display check-in date input', async () => {
            await expect(frontPage.checkInInput).toBeVisible();
        });

        test('should display check-out date input', async () => {
            await expect(frontPage.checkOutInput).toBeVisible();
        });

        test('should display "Check Availability" button', async () => {
            await expect(frontPage.checkAvailabilityBtn).toBeVisible();
        });
    });

    // ─────────────────────────────────────────────
    // Default Values
    // ─────────────────────────────────────────────
    test.describe('Default Values', () => {
        test('check-in date should default to today', async () => {
            await expect(frontPage.checkInInput).toHaveValue(getToday());
        });

        test('check-out date should default to tomorrow', async () => {
            await expect(frontPage.checkOutInput).toHaveValue(getTomorrow());
        });
    });

    // ─────────────────────────────────────────────
    // Date Inputs
    // ─────────────────────────────────────────────
    test.describe('Date Inputs', () => {
        test('should update check-in date', async () => {
            const newCheckIn = getFutureDate(7);
            await frontPage.setCheckInDate(newCheckIn);
            await expect(frontPage.checkInInput).toHaveValue(newCheckIn);
        });

        test('should update check-out date', async () => {
            const newCheckOut = getFutureDate(14);
            await frontPage.setCheckOutDate(newCheckOut);
            await expect(frontPage.checkOutInput).toHaveValue(newCheckOut);
        });
    });

    // ─────────────────────────────────────────────
    // Check Availability
    // ─────────────────────────────────────────────
    test.describe('Check Availability', () => {
        test('should show available rooms after clicking Check Availability', async () => {
            await frontPage.setCheckInDate(getFutureDate(7));
            await frontPage.setCheckOutDate(getFutureDate(14));
            await frontPage.clickCheckAvailability();
            await expect(frontPage.roomsSection).toBeVisible();
        });
    });
});