import { BasePage } from './base/base.page';

export class InventoryPage extends BasePage {
    readonly cartBadge = this.page.locator('.shopping_cart_badge');

    async addItemToCart(itemName: string): Promise<void> {
        // SauceDemo uses data-test attributes like "add-to-cart-sauce-labs-backpack"
        // format: add-to-cart-{kebab-case-item-name}
        const kebabName = itemName.toLowerCase().replace(/ /g, '-');
        const selector = `[data-test="add-to-cart-${kebabName}"]`;
        await this.page.locator(selector).click();
    }
}
