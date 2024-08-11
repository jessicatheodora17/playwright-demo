import { test, expect } from '@playwright/test';
import { doLogin } from '../screenplay/tasks/login';
import  {addBackpackToCart, clickCart, clickCheckout, fillCheckoutForm, confirmOrder, finishOrder}  from '../screenplay/tasks/checkout';
import { Actor } from '../screenplay/actors/actors';

let actor;
let page;

test.beforeEach('Success Login with Standard User', async ({browser, baseURL }) => {
    // go to designated URL
    page = await browser.newPage();
    await page.goto(`${baseURL}`);
    // expect it to show login page
    await expect(page.locator('.login-button')).toBeDefined;
    actor = new Actor('User', page);
    // input username and password then click login button
    await actor.attemptTo(doLogin('standard_user', 'secret_sauce'));

    // assert success got into product page
    await expect(page.locator('[class="product_label"]')).toContainText('Product');
  });

  test('Success Checkout 1 item', async ({}) =>{
    await actor.attemptTo(addBackpackToCart()); //click backpack's add to cart button
    await expect(page.locator('[id="shopping_cart_container"]')).toContainText('1'); //ensure item added to cart
    await actor.attemptTo(clickCart()); // go to cart page
    await expect(page.locator('[class="inventory_item_name"]')).toContainText('Sauce Labs Backpack'); // ensure item is exist
    await actor.attemptTo(clickCheckout()); // go to checkout page
    await expect(page.locator('[class="subheader"]')).toContainText('Checkout: Your Information'); //ensure redirect to information page
    await actor.attemptTo(fillCheckoutForm('firstName', 'lastName', '123456')); //fill checkout form
    await actor.attemptTo(confirmOrder()); // confirm order
    await expect(page.locator('[class="subheader"]')).toContainText('Checkout: Overview'); // ensure redirect to overview order page
    await actor.attemptTo(finishOrder()); // finish order
    await expect(page.locator('[class="complete-header"]')).toContainText('THANK YOU FOR YOUR ORDER'); // ensure order is successfully created
  })

  test('Failed Checkout empty first name', async ({}) =>{
    await actor.attemptTo(addBackpackToCart());
    await expect(page.locator('[id="shopping_cart_container"]')).toContainText('1');
    await actor.attemptTo(clickCart());
    await expect(page.locator('[class="inventory_item_name"]')).toContainText('Sauce Labs Backpack');
    await actor.attemptTo(clickCheckout());
    await expect(page.locator('[class="subheader"]')).toContainText('Checkout: Your Information');
    await actor.attemptTo(fillCheckoutForm('', 'lastName', '123456')); // leave first name field empty
    await actor.attemptTo(confirmOrder());
    await expect(page.locator('xpath=//*[@id="checkout_info_container"]/div/form/h3')).toContainText('First Name is required'); // ensure error with message first name required show
  })

  test('Failed Checkout empty last name', async ({}) =>{
    await actor.attemptTo(addBackpackToCart());
    await expect(page.locator('[id="shopping_cart_container"]')).toContainText('1');
    await actor.attemptTo(clickCart());
    await expect(page.locator('[class="inventory_item_name"]')).toContainText('Sauce Labs Backpack');
    await actor.attemptTo(clickCheckout());
    await expect(page.locator('[class="subheader"]')).toContainText('Checkout: Your Information');
    await actor.attemptTo(fillCheckoutForm('firstName', '', '123456')); // leave last name field empty
    await actor.attemptTo(confirmOrder());
    await expect(page.locator('xpath=//*[@id="checkout_info_container"]/div/form/h3')).toContainText('Last Name is required');  // ensure error with message last name required show
  })

  test('Failed Checkout empty postal code', async ({}) =>{
    await actor.attemptTo(addBackpackToCart());
    await expect(page.locator('[id="shopping_cart_container"]')).toContainText('1');
    await actor.attemptTo(clickCart());
    await expect(page.locator('[class="inventory_item_name"]')).toContainText('Sauce Labs Backpack');
    await actor.attemptTo(clickCheckout());
    await expect(page.locator('[class="subheader"]')).toContainText('Checkout: Your Information');
    await actor.attemptTo(fillCheckoutForm('firstName', 'lastName', '')); // leave postal code field empty
    await actor.attemptTo(confirmOrder());
    await expect(page.locator('xpath=//*[@id="checkout_info_container"]/div/form/h3')).toContainText('Postal Code is required');  // ensure error with message postal code required show
  })
