class LoginPage
{
    constructor(page)
    {
        this.signInButton=page.locator("#login")
        this.userName=page.locator("#userEmail")
        this.password=page.locator("#userPassword")
        this.page=page
    }
    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    }


    async validLogin(username,password)
    {
    await this.userName.fill(username)
    await this.password.fill(password)
    await this.signInButton.click()
    await this.page.waitForLoadState("networkidle")

    }
}
module.exports={LoginPage}
