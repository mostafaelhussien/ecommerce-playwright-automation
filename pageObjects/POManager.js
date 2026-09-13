const{LoginPage}=require("./loginPage")
const{DashBoardPage}=require("./DashBoardPage")
const{CartPage}=require("./CartPage")
const{OrderReviewPage}=require("./OrderReviewPage")
const { OrdersHistoryPage } = require("./OrderHistoryPage")
class POManager
{
    constructor(page)
    {
        this.page=page
        this.loginPage=new LoginPage(this.page)
        this.dashBoardPage=new DashBoardPage(this.page)
        this.cartPage=new CartPage(this.page)
        this.orderReviewPage=new OrderReviewPage(this.page)
        this.orderHistoryPage=new OrdersHistoryPage(this.page)
    }

    getLoginPage()
    {
        return this.loginPage
    }
    getDashBoardPage()
    {
        return this.dashBoardPage
    }
    getCartPage()
    {
        return this.cartPage
    }
    getOrderReviewPage()
    {
        return this.orderReviewPage
    }
    getOrderHistoryPage()
    {
        return this.orderHistoryPage
    }

}
module.exports={POManager}
