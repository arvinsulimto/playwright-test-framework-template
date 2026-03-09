import { BasePage } from './base/base.page';

export class InventoryPage extends BasePage {
    protected path = '/inventory.html';

    readonly cartBadge = this.page.locator('.shopping_cart_badge');
    readonly shoppingCartLink = this.page.locator('.shopping_cart_link');
    readonly sortDropdown = this.page.locator('[data-test="product-sort-container"]');
    readonly itemPrices = this.page.locator('[data-test="inventory-item-price"]');

    async addItemToCart(itemName: string): Promise<void> {
        const kebabName = itemName.toLowerCase().replace(/ /g, '-');
        const selector = `[data-test="add-to-cart-${kebabName}"]`;
        await this.page.locator(selector).click();
    }

    async clickShoppingCartLink(): Promise<void> {
        await this.shoppingCartLink.click();
    }

    async sortProducts(sortValue: string): Promise<void> {
        await this.sortDropdown.selectOption(sortValue);
    }

    async getProductPrices(): Promise<number[]> {
        const priceTexts = await this.itemPrices.allTextContents();
        return priceTexts.map((price) => parseFloat(price.replace('$', '')));
    }
}
