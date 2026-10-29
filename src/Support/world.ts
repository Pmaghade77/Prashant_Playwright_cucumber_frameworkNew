import { Browser, BrowserContext, Page, chromium, firefox, webkit } from "@playwright/test";
import { setWorldConstructor,World,After,Before, setDefaultTimeout } from "@cucumber/cucumber";

export class CustomWorld extends World
{
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    scenarioName = '';

  

}

Before (async function (this:CustomWorld) {
    const name = (process.env.BROWSER || 'chromium') as 'chromium' | 'firefox' | 'webkit';
    this.browser = await { chromium, firefox, webkit }[name].launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
})


After ( async function (this:CustomWorld) {
    await this.context?.close()
    await this.browser?.close()
    
})

setDefaultTimeout(30000)
setWorldConstructor(CustomWorld)



