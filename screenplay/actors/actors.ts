import { Page } from 'playwright';

export class Actor {
    private _name: string;
    private _page: Page;

    constructor(name: string, page: Page) {
        this._name = name;
        this._page = page;
    }

    public get name(): string {
        return this._name;
    }

    public get page(): Page {
        return this._page;
    }

    public async attemptTo(action: any) {
        return action.performAs(this);
    }
}