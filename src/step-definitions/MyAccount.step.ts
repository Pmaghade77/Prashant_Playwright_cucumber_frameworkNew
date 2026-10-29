import{Given,Then,When} from'@cucumber/cucumber'
import { CustomWorld } from '../Support/world';
import { BasePage } from '../pages/BasePage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { PlaywrightUtils } from '../Support/PlaywrightUtils';
import { expect } from '@playwright/test'
import playwrightConfig from '../../playwright.config';
let myaccountPage :MyAccountPage;
Given('I am on the sdet unicorns my account page', async function (this:CustomWorld) {
   
    myaccountPage = new MyAccountPage(this.page)

    await myaccountPage.navigate()
  
});

Then('I should see the my account page heading {string}', async function (this:CustomWorld,expectedHeading:string) {
 
    const heading = myaccountPage.getPageHeading(expectedHeading)
    await PlaywrightUtils.waitforLocatorVisible(heading)
    await expect (heading).toBeVisible()

});

Then('I should see the login form fields', async function (this:CustomWorld) {

    await PlaywrightUtils.waitforLocatorVisible(myaccountPage.userNameInput)
    await PlaywrightUtils.waitforLocatorVisible(myaccountPage.passwordInput)
    await PlaywrightUtils.waitforLocatorVisible(myaccountPage.loginButton)

    await expect(myaccountPage.userNameInput).toBeVisible()
    await expect(myaccountPage.passwordInput).toBeVisible()
    await expect(myaccountPage.loginButton).toBeVisible()
});

Then('I should see the resgister form fields',async function (this:CustomWorld) {
 
    await PlaywrightUtils.waitforLocatorVisible(myaccountPage.registerUsername)
    await PlaywrightUtils.waitforLocatorVisible(myaccountPage.registerPassword)
    await PlaywrightUtils.waitforLocatorVisible(myaccountPage.registerEmail)
    await PlaywrightUtils.waitforLocatorVisible(myaccountPage.registerButton)

    await expect(myaccountPage.registerUsername).toBeVisible()
    await expect(myaccountPage.registerPassword).toBeVisible()
    await expect(myaccountPage.registerEmail).toBeVisible()
    await expect(myaccountPage.registerButton).toBeVisible()
});

When('I login with username {string} and password {string}', async function (this:CustomWorld,username:string, password:string) {
 
    await myaccountPage.login(username,password)
});

Then('I should see my account dashboard', async function (this:CustomWorld) {
  await expect(this.page).toHaveURL(/my-account/)
});

When('I enter username {string} and email {string} and password {string}', async function (this:CustomWorld,username:string, email:string, password:string) {

  await myaccountPage.register(username,email,password)
});
