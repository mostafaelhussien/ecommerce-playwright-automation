class DashBoardPage
{
    constructor(page)
    {
        this.products=page.locator(".card-body")
        this.cardTitles=page.locator(".card-body b")
        this.cart=page.locator("[routerlink*='cart']")
    }

    async searchProductAddToCart(productName)
    {
    await this.products.first().waitFor();
    const allTitles2=await this.cardTitles.allTextContents()
    console.log(allTitles2)

    // Get how many products are currently displayed on the page
    const count=await this.products.count()
    for (let i=0;i<count;i++)
    {
    // STEP A: Chain to read the title inside the current box (i)
       if((await this.products.nth(i).locator("b").textContent()).trim()===productName)
       {
        // add to cart
        // STEP B: Chain to click the correct button inside the same matched box (i)
        await this.products.nth(i).locator("text=Add To Cart").click()
        break
       }
    }
    }

    async navigateToCart()
    {
        await this.cart.click()


    }
}
module.exports={DashBoardPage}
