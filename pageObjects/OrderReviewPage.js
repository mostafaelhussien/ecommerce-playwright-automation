const { expect } = require("@playwright/test");
class OrderReviewPage 
{
    constructor(page)
    {
        this.page=page
        this.country=page.locator("[placeholder*='Country']")
        this.dropDown=page.locator(".ta-results")
        this.emailId=page.locator(".user__name [type='text']").first()
        this.submit=page.locator(".action__submit")
        this.orderConfirmationText=page.locator(".hero-primary")
        this.orderId=page.locator(".em-spacer-1 .ng-star-inserted")

    }

    async searchAndSelectCountry(countryCode,countryName)
    {
        await this.country.pressSequentially(countryCode,{delay:100})
        await this.dropDown.waitFor()
        const optionsCount=await this.dropDown.locator("button").count()
    for(let i =0;i<optionsCount;i++){
        const searchResults=await this.dropDown.locator("button").nth(i).textContent()
        if (searchResults.trim()===(countryName))
        {
            await this.dropDown.locator("button").nth(i).click()
            break
        }
    }
 }
   async verifyEmail(username)
   {
    await expect(this.emailId).toHaveText(username)
   }
   async submitAndGetOrderId()
   {
        await this.submit.click()
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ")
        return await this.orderId.textContent()
   }
}
module.exports={OrderReviewPage}
