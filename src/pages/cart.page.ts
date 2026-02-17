import { BasePage } from './base/base.page';

export class CartPage extends BasePage {
    protected path = '/cart.html';

    readonly cartItems = this.page.locator('.cart_item');

    cartItemName(itemName: string) {
        return this.page.locator('.inventory_item_name').filter({ hasText: itemName });
    }
}
