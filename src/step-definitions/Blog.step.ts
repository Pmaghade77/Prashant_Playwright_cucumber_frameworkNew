
import{DataTable, Given,Then,When} from'@cucumber/cucumber'
import { CustomWorld } from '../Support/world';
import { BasePage } from '../pages/BasePage';

import { PlaywrightUtils } from '../Support/PlaywrightUtils';
import { expect } from '@playwright/test'
import playwrightConfig from '../../playwright.config';
import { AboutPage } from '../pages/AboutPage';
import { BlogPage } from '../pages/BlogPage';
import { title } from 'node:process';

let blogPage:BlogPage


Given('I am on the SDET Unicorns blog page', async function (this:CustomWorld) {
  blogPage = new BlogPage(this.page)
await blogPage.navigate()
});
Then('I should see the page heading {string}', async function (this:CustomWorld,expectedHeading:string) {

    await expect(blogPage.pageTitle).toHaveText(expectedHeading)
});

Then('I should see the following blog posts:', async function (this:CustomWorld,dataTable:DataTable) {
  
    const expectedTitles = dataTable.hashes().map((row) => row.postTitle.trim())
    const actualTitles = (await blogPage.getPostTitles()).map((title) => title.trim())

    for (let expectedTitle of expectedTitles)
    {
        await expect(actualTitles).toContain(expectedTitle)
    }
})

When('I click on Older Posts',async  function (this:CustomWorld) {
 
    await blogPage.olderPostslink.click()
});

When('I open a blog post {string}', async function (this:CustomWorld,expectedpostTitle:string) {

await blogPage.openPost(expectedpostTitle)
 
});

Then('I should see the blog article heading {string}', async function (this:CustomWorld,expectedarticleHeading:string) {

    await expect(blogPage.articleTitle).toHaveText(expectedarticleHeading)
});

When('I search for {string}',async  function (this:CustomWorld,SearchKeyword:string) {
    await blogPage.search(SearchKeyword)
     await this.page.waitForLoadState('domcontentloaded');

     const matchingpost =   'Successful Marketing Ads for Your Business';
     const availablePosts = (await blogPage.getPostTitles()).map((title) => title.trim())
 
     if(availablePosts.includes(matchingpost))
     {
        await blogPage.openPost(matchingpost)
     }
});