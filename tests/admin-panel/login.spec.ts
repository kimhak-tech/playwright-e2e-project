import { test, expect } from '@playwright/test';
import { AdminPage } from "../../pages/AdminPage";
import { Header } from "../../pages/components/Header";

test.describe('Login Tests', () => {
    let adminPage: AdminPage;
    let header: Header;

    const style = 'style';
    const redBorder = 'border: 1px solid red;';
    
    test.beforeEach(async ({ page, baseURL }) => {
       adminPage = new AdminPage(page);
       header = new Header(page);
       
       await adminPage.hideBanner(baseURL);
       await adminPage.goto();
    });
    
    test('Admin is able to login with correct username and password @sanity @admin', async () => {
        adminPage.login('admin', 'password');
        await expect(header.logoutLink, 'Admin logged in!').toBeVisible();
    });

    test('Admin is not able to login with empty username @admin', async () => {
        adminPage.login('', 'password');
        await expect(header.logoutLink, 'Admin is not logged in.').toBeHidden();
        await expect(adminPage.usernameField, 'Username field has red border.').toHaveAttribute(style, redBorder);
    });
    
    test('Admin is not able to login with empty password @admin', async () => {
        adminPage.login('admin', '');
        await expect(header.logoutLink, 'Admin is not logged in.').toBeHidden();
        await expect(adminPage.passwordField, 'Password field has red border.').toHaveAttribute(style, redBorder);
    });

    test('Admin is not able to login with incorrect password @admin', async () => {
        adminPage.login('admin', 'wrong_password');
        await expect(header.logoutLink, 'Admin is not logged in.').toBeHidden();
        await expect(adminPage.usernameField, 'Username field has red border.').toHaveAttribute(style, redBorder);
        await expect(adminPage.passwordField, 'Password field has red border.').toHaveAttribute(style, redBorder);
    });
    
    test('Admin is not able to login with incorrect username @admin', async () => {
        adminPage.login('wrong_admin', 'password');
        await expect(header.logoutLink, 'Admin is not logged in.').toBeHidden();
        await expect(adminPage.usernameField, 'Username field has red border.').toHaveAttribute(style, redBorder);
        await expect(adminPage.passwordField, 'Password field has red border.').toHaveAttribute(style, redBorder);
    });

});
