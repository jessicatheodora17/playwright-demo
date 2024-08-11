import { Actor } from '../actors/actors.ts';

export const addBackpackToCart = () => ({
    async performAs(actor: Actor) {
        await actor.page.locator('xpath=//*[@id="inventory_container"]/div/div[1]/div[3]/button').click()
    }
});

export const clickCart = () => ({
    async performAs(actor: Actor) {
        await actor.page.locator('[id="shopping_cart_container"]').click()
    }
})

export const clickCheckout = () => ({
    async performAs(actor: Actor) {
        await actor.page.locator('xpath=//*[@id="cart_contents_container"]/div/div[2]/a[2]').click()
    }
})

export const fillCheckoutForm = (firstName: string, lastName: string, postalCode: string) => ({
    async performAs(actor: Actor) {
        await actor.page.locator('[id="first-name"]').click()
        await actor.page.locator('[id="first-name"]').fill(firstName)
        await actor.page.locator('[id="last-name"]').click()
        await actor.page.locator('[id="last-name"]').fill(lastName)
        await actor.page.locator('[id="postal-code"]').click()
        await actor.page.locator('[id="postal-code"]').fill(postalCode)
        
    }
})

export const confirmOrder = () => ({
    async performAs(actor: Actor) {
        await actor.page.locator('xpath=//*[@id="checkout_info_container"]/div/form/div[2]/input').click()
    }
})

export const finishOrder = () => ({
    async performAs(actor: Actor) {
        await actor.page.locator('xpath=//*[@id="checkout_summary_container"]/div/div[2]/div[8]/a[2]').click()
    }
})
