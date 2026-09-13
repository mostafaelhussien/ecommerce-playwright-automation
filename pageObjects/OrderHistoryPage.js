const { expect } = require("@playwright/test")
class OrdersHistoryPage
{
    constructor(page)
    {
        this.ordersButton=page.locator("button[routerlink*='myorders']")
        this.ordersPage=page.locator("tbody")
        this.ordersrows=page.locator("tbody tr")
        this.orderDetails=page.locator(".col-text")
    }

    async validateOrderId(orderId)
    {
       await this.ordersButton.click()
       await this.ordersPage.waitFor()
       await this.ordersrows.first().waitFor()
       const rowsCount=await this.ordersrows.count()
       for(let i =0;i<rowsCount;i++)
    {
        const myOrderId=await this.ordersrows.nth(i).locator("th").textContent()
        if(orderId.includes(myOrderId))
        {
            console.log("Order Found")
            await this.ordersrows.nth(i).locator("button").first().click()
            break
        }
    }
    return await this.orderDetails.textContent()
    
}
}
module.exports={OrdersHistoryPage}
