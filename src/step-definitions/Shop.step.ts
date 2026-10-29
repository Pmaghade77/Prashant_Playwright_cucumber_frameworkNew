import{DataTable, Given,Then,When} from'@cucumber/cucumber'
import { CustomWorld } from '../Support/world';
import { BasePage } from '../pages/BasePage';

import { PlaywrightUtils } from '../Support/PlaywrightUtils';
import { expect } from '@playwright/test'
import playwrightConfig from '../../playwright.config';
import { AboutPage } from '../pages/AboutPage';
import { availableMemory } from 'node:process';
import { SuiteContext } from 'node:test';
import { ContactPage } from '../pages/Contact.page';
import { ShopPage } from '../pages/Shop.page';
import { cachedDataVersionTag } from 'node:v8';

let shopPage : ShopPage
Given('I am on the SDET Unicorns shop page', async function (this:CustomWorld) {
 
    shopPage = new ShopPage(this.page)
    await shopPage.navigate()
});

Then('I should see the shop page heading {string}', async function (this:CustomWorld,expectedHeading:string) {

    const heading = shopPage.getPageHeading(expectedHeading)

    await PlaywrightUtils.waitforLocatorVisible(heading)

    await expect(heading).toBeVisible()

});


Then('I should see the following products:', async function (this:CustomWorld,dataTable:DataTable) {

    const expectedProducts = dataTable.hashes().map((row) => row.productName.trim())
    console.log(expectedProducts)
    const acutalProducts = (await shopPage.getProductTitle()).map((title) => title.trim())
    console.log(acutalProducts)

    for(const expectedProduct of expectedProducts)
    {
        expect(acutalProducts).toContain(expectedProduct)
    }

});


Then('I should see the product category {string}', async function (this:CustomWorld,categoryText:string) {

    const categorylink = shopPage.getCategoryLink(categoryText)
    await PlaywrightUtils.waitforLocatorVisible(categorylink)
    console.log(await categorylink.allInnerTexts())
    await expect(categorylink).toBeVisible()

});
