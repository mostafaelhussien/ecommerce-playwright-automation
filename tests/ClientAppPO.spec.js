const {test,expect}=require("@playwright/test") //Go to Supermarket playwright/test and buy {test} only
const{customTest}=require("../utils/test-base")
const{POManager}=require("../pageObjects/POManager")
//json->string->js object

const dataset=JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json"))) //convert JSON to JS Object

for(const data of dataset)
{
test(`Client App Testing for ${data.productName}`,async({page})=>{
    const poManager=new POManager(page)
    const loginPage=poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(data.username,data.password)
    const dashBoardPage=poManager.getDashBoardPage()
    await dashBoardPage.searchProductAddToCart(data.productName)
    await dashBoardPage.navigateToCart()
    const cartPage=poManager.getCartPage()
    const orderReviewPage=poManager.getOrderReviewPage()
    await cartPage.verifyAddedProduct(data.productName)
    await cartPage.clickCheckOut()
    await orderReviewPage.searchAndSelectCountry("eg","Egypt")
    await orderReviewPage.verifyEmail(data.username)
    const orderId=await orderReviewPage.submitAndGetOrderId()
    console.log(orderId)
    const orderHistoryPage=poManager.getOrderHistoryPage()
    const orderDetailsText = await orderHistoryPage.validateOrderId(orderId)
    expect(orderId.includes(orderDetailsText)).toBeTruthy()
})
}
customTest("Client App Login " ,async({page,testDataForOrder})=>{
    const poManager=new POManager(page)
    const loginPage=poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password)
    const dashBoardPage=poManager.getDashBoardPage()
    await dashBoardPage.searchProductAddToCart(testDataForOrder.productName)
    await dashBoardPage.navigateToCart()
    const cartPage=poManager.getCartPage()
    const orderReviewPage=poManager.getOrderReviewPage()
    await cartPage.verifyAddedProduct(testDataForOrder.productName)
    await cartPage.clickCheckOut()
})
