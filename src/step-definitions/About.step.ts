import{Given,Then,When} from'@cucumber/cucumber'
import { CustomWorld } from '../Support/world';
import { BasePage } from '../pages/BasePage';

import { PlaywrightUtils } from '../Support/PlaywrightUtils';
import { expect } from '@playwright/test'
import playwrightConfig from '../../playwright.config';
import { AboutPage } from '../pages/AboutPage';
import { availableMemory } from 'node:process';

let aboutPage:AboutPage

Given('I am on the SDET Unicorns page',async  function (this:CustomWorld) {
 aboutPage = new AboutPage(this.page)
 await aboutPage.navigate()
});

Then('I Should see the About page Heading {string}',async function (expectedHeadingText:string) {
    await PlaywrightUtils.waitforLocatorVisible(aboutPage.getHeading(expectedHeadingText))
    await expect(aboutPage.getHeading(expectedHeadingText)).toBeVisible()
 
});

Then('I should see the about page section {string}', async function (this:CustomWorld,sectioName:string) {
    await PlaywrightUtils.waitforLocatorVisible(aboutPage.getSection(sectioName))
    await expect(aboutPage.getSection(sectioName)).toBeVisible()
  
});

Then('I should see the about page link {string}', async function (this:CustomWorld,linkName:string) {

await PlaywrightUtils.waitforLocatorVisible(aboutPage.getLink(linkName));
  await expect(aboutPage.getLink(linkName)).toBeVisible();
});

When ('I click the about page link {string}',async function (this:CustomWorld,linkName:string)
{
    const link = aboutPage.getLink(linkName)
    await PlaywrightUtils.clickIfVisible(link)
})
