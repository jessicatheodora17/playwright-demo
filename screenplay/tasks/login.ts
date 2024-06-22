import { Actor } from '../actors/actors.ts';

export const LoginTask = (username: string, password: string) => ({
    async performAs(actor: Actor) {
        await actor.page.locator('[id="user-name"]').click()
        await actor.page.locator('[id="user-name"]').fill(username)
        await actor.page.locator('[id="password"]').click()
        await actor.page.locator('[id="password"]').fill(password)
        await actor.page.locator('[id="login-button"]').click()
    }
});