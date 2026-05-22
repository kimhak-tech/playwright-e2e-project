import { test, expect } from '../../fixtures/frontpage-fixture';
import { FrontPage } from '../../pages/FrontPage';
import { getAvailableRooms, Room } from '../../utils/api-helpers';

test.describe('Rooms Section', () => {
    let frontPage: FrontPage;
    let availableRooms: Room[] = [];

    test.beforeEach(async ({ page }) => {
        frontPage = new FrontPage(page);

        // API is called on page load with default dates — no button click needed
        const roomsResponse = getAvailableRooms(page);
        await frontPage.goto();
        availableRooms = await roomsResponse;

        await frontPage.clickNavRooms();
    });

    // ─────────────────────────────────────────────
    // Visibility
    // ─────────────────────────────────────────────
    test.describe('Visibility', () => {
        test('should display the rooms section', async () => {
            await expect(frontPage.roomsSection).toBeVisible();
        });

        test('should display maximum 3 room cards regardless of API response', async () => {
            const expectedCount = Math.min(availableRooms.length, 3);
            await expect(frontPage.roomCards).toHaveCount(expectedCount);
        });

        test('should display no room cards if API returns empty list', async ({ page }) => {
            await page.route('**/api/room**', route => route.fulfill({
                status : 200,
                body   : JSON.stringify({ rooms: [] }),
            }));

            await frontPage.goto();
            await frontPage.clickNavRooms();

            await expect(frontPage.roomCards).toHaveCount(0);
        });
    });

    // ─────────────────────────────────────────────
    // Room Cards — driven by API response (max 3)
    // ─────────────────────────────────────────────
    test.describe('Room Cards', () => {
        test('should display correct room type for each visible card', async () => {
            const visibleRooms = availableRooms.slice(0, 3);
            for (const room of visibleRooms) {
                await expect(frontPage.getRoomCard(room.roomid)).toBeVisible();
            }
        });

        test('should display correct price for each visible card', async () => {
            const visibleRooms = availableRooms.slice(0, 3);
            for (const room of visibleRooms) {
                await expect(frontPage.getRoomCard(room.roomid))
                    .toContainText(`£${room.roomPrice}`);
            }
        });

        test('should display correct features for each visible card', async () => {
            const visibleRooms = availableRooms.slice(0, 3);
            for (const room of visibleRooms) {
                const card = frontPage.getRoomCard(room.roomid);
                for (const feature of room.features) {
                    await expect(card).toContainText(feature);
                }
            }
        });

        test('"Book now" link should point to correct reservation URL', async () => {
            const visibleRooms = availableRooms.slice(0, 3);
            for (const room of visibleRooms) {
                const bookLink = frontPage.getRoomCard(room.roomid)
                    .getByRole('link', { name: 'Book now' });
                await expect(bookLink).toHaveAttribute(
                    'href', new RegExp(`/reservation/${room.roomid}`)
                );
            }
        });

        test('clicking "Book now" should navigate to the correct reservation page', async ({ page }) => {
            const firstRoom = availableRooms[0];
            await frontPage.clickBookNow(firstRoom.roomid);
            await expect(page).toHaveURL(new RegExp(`/reservation/${firstRoom.roomid}`));
        });
    });

    // TODO: Some test cases will failed if there are no available rooms.
    // TODO: Setup the data inside globalSetup & globalTeardown
    
});