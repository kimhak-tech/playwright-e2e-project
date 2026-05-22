import { test as baseTest, request } from '@playwright/test';
import { Branding } from '../utils/api-helpers';

type FrontWorkerFixtures = {
    branding: Branding;
};

// ─────────────────────────────────────────────
// front-page-fixture — base for all front-page specs
// Extends base-fixture and adds:
//   - branding: fetched once per worker via direct
//               HTTP, shared across all front-page tests
// ─────────────────────────────────────────────
export const test = baseTest.extend<{}, FrontWorkerFixtures>({

    branding: [async ({ }, use) => {
        const context = await request.newContext({
            baseURL: process.env.BASE_URL ?? 'http://localhost'
        });
        const response = await context.get('/api/branding');
        const branding: Branding = await response.json();
        await context.dispose();

        await use(branding);
    }, { scope: 'worker' }],
});

export { expect } from '@playwright/test';