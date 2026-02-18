import { BasePage } from './base/base.page';

export class InventoryPage extends BasePage {
    protected path = '/inventory.html';

    readonly cartBadge = this.page.locator('.shopping_cart_badge');
    readonly shoppingCartLink = this.page.locator('.shopping_cart_link');

    async addItemToCart(itemName: string): Promise<void> {
        const kebabName = itemName.toLowerCase().replace(/ /g, '-');
        const selector = `[data-test="add-to-cart-${kebabName}"]`;
        await this.page.locator(selector).click();
    }

    async clickShoppingCartLink() {
        await this.shoppingCartLink.click();
    }
}
