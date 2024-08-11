import { test, expect } from '@playwright/test';
import { doLogin } from '../screenplay/tasks/login';
import { Actor } from '../screenplay/actors/actors';

test('Success Login with Standard User', async ({ page, baseURL }) => {
    // go to designated URL
    await page.goto(`${baseURL}`);
    // expect it to show login page
    await expect(page.locator('.login-button')).toBeDefined;
    const actor = new Actor('User', page);
    // input username and password then click login button
    await actor.attemptTo(doLogin('standard_user', 'secret_sauce'));

    // assert success got into product page
    await expect(page.locator('[class="product_label"]')).toContainText('Product');
  });

  test('Login with Locked Out User', async ({ page, baseURL }) => {
    // go to designated URL
    await page.goto(`${baseURL}`);
    // expect it to show login page
    await expect(page.locator('.login-button')).toBeDefined;
    const actor = new Actor('User', page);
    // input username and password then click login button
    await actor.attemptTo(doLogin('locked_out_user', 'secret_sauce'));

    // assert success got into product page
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out.')
  });

  test('Login with Invalid User', async ({ page, baseURL }) => {
    // go to designated URL
    await page.goto(`${baseURL}`);
    // expect it to show login page
    await expect(page.locator('.login-button')).toBeDefined;
    const actor = new Actor('User', page);
    // input username and password then click login button
    await actor.attemptTo(doLogin('invalid', 'secret_sauce'));
    // assert success got into product page
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service')
  });
