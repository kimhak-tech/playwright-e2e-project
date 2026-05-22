import { test as base } from '@playwright/test';

// ─────────────────────────────────────────────
// base-test — root of all test suites
// Only contains fixtures shared across every
// suite: front-page, admin, and api.
//
// Currently acts as the common ancestor so all
// suites can extend from a single base.
// Add truly global fixtures here (e.g. auth
// tokens, environment config) as the project grows.
// ─────────────────────────────────────────────
export const test = base;
export { expect } from '@playwright/test';