import { test, expect } from '../../fixtures/frontpage-fixture';
import { FrontPage } from '../../pages/FrontPage';
import { faker } from '@faker-js/faker';
import { invalidEmails } from '../../data/invalid-emails';

function validPayload() {
    return {
        name    : `${faker.person.firstName()} ${faker.person.lastName()}`,
        email   : faker.internet.email(),
        phone   : faker.phone.number(),
        subject : faker.lorem.sentence(3),
        message : faker.lorem.lines(5),
    };
}

test.describe('Contact Section', () => {
    let frontPage: FrontPage;

    test.beforeEach(async ({ page }) => {
        frontPage = new FrontPage(page);
        await frontPage.goto();
        await frontPage.clickNavContact();
    });

    // ─────────────────────────────────────────────
    // Visibility
    // ─────────────────────────────────────────────
    test.describe('Visibility', () => {
        test('should display all form fields', async () => {
            await expect(frontPage.contactNameInput).toBeVisible();
            await expect(frontPage.contactEmailInput).toBeVisible();
            await expect(frontPage.contactPhoneInput).toBeVisible();
            await expect(frontPage.contactSubjectInput).toBeVisible();
            await expect(frontPage.contactMessageInput).toBeVisible();
            await expect(frontPage.contactSubmitBtn).toBeVisible();
        });

        test('all fields should be empty by default', async () => {
            await expect(frontPage.contactNameInput).toHaveValue('');
            await expect(frontPage.contactEmailInput).toHaveValue('');
            await expect(frontPage.contactPhoneInput).toHaveValue('');
            await expect(frontPage.contactSubjectInput).toHaveValue('');
            await expect(frontPage.contactMessageInput).toHaveValue('');
        });
    });

    // ─────────────────────────────────────────────
    // Successful Submission
    // ─────────────────────────────────────────────
    test.describe('Successful Submission', () => {
        test('should show thank-you message with name and subject', async () => {
            const data = validPayload();
            await frontPage.sendMessage(data.name, data.email, data.phone, data.subject, data.message);

            await expect(frontPage.contactSuccessMessage).toBeVisible();
            await expect(frontPage.contactSuccessMessage).toContainText(`Thanks for getting in touch ${data.name}!`);
            await expect(frontPage.contactSuccessMessage).toContainText(data.subject);
            await expect(frontPage.contactSuccessMessage).toContainText('as soon as possible');
        });

        test('should hide the form after successful submission', async () => {
            const data = validPayload();
            await frontPage.sendMessage(data.name, data.email, data.phone, data.subject, data.message);

            await expect(frontPage.contactSubmitBtn).not.toBeVisible();
            await expect(frontPage.contactNameInput).not.toBeVisible();
        });
    });

    // ─────────────────────────────────────────────
    // Mandatory Field Validation
    // ─────────────────────────────────────────────
    test.describe('Mandatory Field Validation', () => {
        const mandatoryFields = [
            { field: 'name',    errorMessages: ['Name may not be blank'] },
            { field: 'email',   errorMessages: ['Email may not be blank'] },
            { field: 'phone',   errorMessages: ['Phone may not be blank', 'Phone must be between 11 and 21 characters'] },
            { field: 'subject', errorMessages: ['Subject may not be blank', 'Subject must be between 5 and 100 characters'] },
            { field: 'message', errorMessages: ['Message may not be blank', 'Message must be between 20 and 2000 characters'] },
        ];

        for (const { field, errorMessages } of mandatoryFields) {
            test(`should show error when ${field} is empty`, async () => {
                const data = { ...validPayload(), [field]: '' };
                await frontPage.sendMessage(data.name, data.email, data.phone, data.subject, data.message);

                await expect(frontPage.contactErrorMessages).toBeVisible();
                for (const message of errorMessages) {
                    await expect(frontPage.contactErrorMessages).toContainText(message);
                }
            });
        }
    });

    // ─────────────────────────────────────────────
    // Email Validation
    // ─────────────────────────────────────────────
    test.describe('Email Validation', () => {
        for (const invalidEmail of invalidEmails) {
            test(`should show error for invalid email: ${invalidEmail}`, async () => {
                test.skip(invalidEmail === 'email@example', 'Known issue');

                const data = { ...validPayload(), email: invalidEmail };
                await frontPage.sendMessage(data.name, data.email, data.phone, data.subject, data.message);

                await expect(frontPage.contactErrorMessages).toBeVisible();
                await expect(frontPage.contactErrorMessages).toContainText('must be a well-formed email address');
            });
        }
    });

    // ─────────────────────────────────────────────
    // Boundary Value Validation
    // ─────────────────────────────────────────────
    test.describe('Boundary Value Validation', () => {
        const boundaryTests = [
            {
                field         : 'phone',
                validationMsg : 'Phone must be between 11 and 21 characters',
                invalidValues : ['1234567890', '1234567890123456789012'],
                validValues   : ['12345678901', '123456789012345678901'],
            },
            {
                field         : 'subject',
                validationMsg : 'Subject must be between 5 and 100 characters',
                invalidValues : [faker.string.alphanumeric(4), faker.string.alphanumeric(101)],
                validValues   : [faker.string.alphanumeric(5), faker.string.alphanumeric(100)],
            },
            {
                field         : 'message',
                validationMsg : 'Message must be between 20 and 2000 characters',
                invalidValues : [faker.string.alphanumeric(19), faker.string.alphanumeric(2001)],
                validValues   : [faker.string.alphanumeric(20), faker.string.alphanumeric(2000)],
            },
        ];

        for (const { field, validationMsg, invalidValues, validValues } of boundaryTests) {
            test.describe(`${field} length`, () => {
                for (const value of invalidValues) {
                    test(`should show error for invalid ${field} length (${value.length} chars)`, async () => {
                        const data = { ...validPayload(), [field]: value };
                        await frontPage.sendMessage(data.name, data.email, data.phone, data.subject, data.message);

                        await expect(frontPage.contactErrorMessages).toBeVisible();
                        await expect(frontPage.contactErrorMessages).toContainText(validationMsg);
                    });
                }

                for (const value of validValues) {
                    test(`should succeed with valid ${field} length (${value.length} chars)`, async () => {
                        const data = { ...validPayload(), [field]: value };
                        await frontPage.sendMessage(data.name, data.email, data.phone, data.subject, data.message);

                        await expect(frontPage.contactSuccessMessage).toBeVisible();
                        await expect(frontPage.contactSuccessMessage).toContainText('Thanks for getting in touch');
                    });
                }
            });
        }
    });
});