const { expect } = require("@playwright/test")
class CartPage
{
    constructor(page)
    {
        this.page=page
        this.firstCardItem=page.locator("div li").first()
        this.checkOutButton=page.locator("text=Checkout")

    }
     getProductLocator(productName)
    {
        return this.page.locator(`h3:has-text("${productName}")`)
    }
    async verifyAddedProduct(productName)
    {
        await this.firstCardItem.waitFor()
        const prodAdded= await this.getProductLocator(productName).isVisible()
        expect(prodAdded).toBeTruthy();

    }    
    async clickCheckOut()
    {
        await this.checkOutButton.click()
    }
}
module.exports={CartPage}
