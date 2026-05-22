import { Page } from '@playwright/test';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export type BrandingAddress = {
    line1    : string;
    line2    : string;
    postTown : string;
    county   : string;
    postCode : string;
};

export type BrandingContact = {
    name  : string;
    email : string;
    phone : string;
};

export type BrandingMap = {
    latitude  : string;
    longitude : string;
};

export type Branding = {
    address   : BrandingAddress;
    contact   : BrandingContact;
    description: string;
    directions: string;
    map: BrandingMap;
    logoUrl: string;
    name: string;
};

export type Room = {
    roomid    : number;
    roomName  : string;
    type      : string;
    roomPrice : number;
    accessible: boolean;
    features  : string[];
    description: string;
};

// ─────────────────────────────────────────────
// Interceptors
// ─────────────────────────────────────────────
export async function getBranding(page: Page): Promise<Branding> {
    const response = await page.waitForResponse(
        res => res.url().includes('/api/branding') && res.status() === 200
    );
    return response.json();
}

export async function getAvailableRooms(page: Page): Promise<Room[]> {
    const response = await page.waitForResponse(
        res => res.url().includes('/api/room') && res.status() === 200
    );
    const body = await response.json();
    return body.rooms;
}