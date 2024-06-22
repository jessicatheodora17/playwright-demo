import { test, expect } from '@playwright/test';

test('Success Login with Standard User', async ({ page }) => {
    // go to deisignated URL
    await page.goto('https://saucedemo.com/v1');
    // expect it to show login page
    await expect(page.locator('.login-button')).toBeDefined;

    // input username and password then click login button
    await page.locator('[id="user-name"]').click()
    await page.locator('[id="user-name"]').fill('standard_user')
    await page.locator('[id="password"]').click()
    await page.locator('[id="password"]').fill('secret_sauce')
    await page.locator('[id="login-button"]').click()

    // assert success got into product page
    await expect(page.locator('[class="product_label"]')).toContainText('Product')
  });

  test('Login with Locked Out User', async ({ page }) => {
    // go to deisignated URL
    await page.goto('https://saucedemo.com/v1');
    // expect it to show login page
    await expect(page.locator('.login-button')).toBeDefined;
    
    // input username and password then click login button
    await page.locator('[id="user-name"]').click()
    await page.locator('[id="user-name"]').fill('locked_out_user')
    await page.locator('[id="password"]').click()
    await page.locator('[id="password"]').fill('secret_sauce')
    await page.locator('[id="login-button"]').click()

    // assert success got into product page
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out.')
  });

  test('Login with Invalid User', async ({ page }) => {
    // go to deisignated URL
    await page.goto('https://saucedemo.com/v1');
    // expect it to show login page
    await expect(page.locator('.login-button')).toBeDefined;
    
    // input username and password then click login button
    await page.locator('[id="user-name"]').click()
    await page.locator('[id="user-name"]').fill('invalid')
    await page.locator('[id="password"]').click()
    await page.locator('[id="password"]').fill('secret_sauce')
    await page.locator('[id="login-button"]').click()

    // assert success got into product page
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service')
  });
