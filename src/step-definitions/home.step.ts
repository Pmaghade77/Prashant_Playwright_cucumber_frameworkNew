import{DataTable, Given,Then,When} from'@cucumber/cucumber'
import { HomePage } from '../pages/HomePage';
import { CustomWorld } from '../Support/world';
import { expect } from '@playwright/test';
import playwrightConfig from '../../playwright.config';
import { PlaywrightUtils } from '../Support/PlaywrightUtils';


let homepage :HomePage;
Given('I am on the SDET Unicorn HomePage', async function (this:CustomWorld) {
     homepage = new HomePage(this.page);
    await homepage.navigateToHomePage()
});

Then('I should see the HomePage Heading {string}', async function (this:CustomWorld,expectedHeading:string) {
  await expect(homepage.mainHeading).toHaveText(expectedHeading)
});

Then('I should see the Special Sale Heading {string}', async function (this:CustomWorld,expectedHeading:string) {
  await expect(homepage.specialSaleHeading).toHaveText(expectedHeading)
});


Then('I should see Home Navigation link {string}',async function (this:CustomWorld,linkname:string) {
  await expect(homepage.getNavLink(linkname)).toBeVisible()
});

Then('I should see the following pricing plans:', async function (this:CustomWorld,dataTable:DataTable) {

   const plans = dataTable.hashes().map(row=> row.planName)

   for (const plan of plans)
   {
      await expect (homepage.getPricePlan(plan)).toBeVisible()
   }
});

When('I click on the {string} button', async function (this:CustomWorld,buttonText:string) {
  
  if(buttonText !== 'Learn more' )
  {
    throw new Error('Button not implemented')
  }

  const opensNewTab = await homepage.isLearningMoreOpenNewTab()

  if(opensNewTab)
  {
    const [learnMorePage] = await Promise.all([
      this.context.waitForEvent('page'),
      homepage.clickLearnMoreLink()
    ]);

     this.page =  learnMorePage
    homepage = new HomePage(this.page);
    await this.page.waitForLoadState('domcontentloaded')
     return

  }

  await homepage.clickLearnMoreLink()
});

Then('I should see the redirected page text {string}', async function (this:CustomWorld,expectedText:string) {

  await expect(homepage.getRedirectedPageText(expectedText)).toBeVisible()


  
});

When('I am return to the Parent website', async function (this:CustomWorld) {

    this.page = await PlaywrightUtils.switchToParentPage(
    this.context,
    this.page
  );


await expect(this.page).toHaveURL('https://practice.sdetunicorns.com/#get-started');
  homepage = new HomePage(this.page);
  await this.page.waitForLoadState('domcontentloaded')
  
});









