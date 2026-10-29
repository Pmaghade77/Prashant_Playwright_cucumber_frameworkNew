import { BrowserContext, Locator, Page } from "@playwright/test";
import { Context } from "node:vm";


export class PlaywrightUtils
{
    //checkbox 
    //window handels


    static async checkCheckBox(locator:Locator):Promise<void>
    {
        if(!(await locator.isChecked()))
        {
            await locator.check()
        }
        
    }

    static async uncheckCheckBox(locator:Locator):Promise<void>
        {
            if( await locator.isChecked())
            {
                await locator.uncheck()
            }
        }

//   static  async switchToParentPage(context:BrowserContext, currentPage:Page) :Promise<Page>
//     {
//         const pages =    context.pages()

//         if (pages.length<=1 )
//         {
//             return currentPage

//         }

//         const parentPage = pages[0]
//         await parentPage.bringToFront()
//         return parentPage
//     }



static async switchToParentPage(
    context: BrowserContext,
    currentPage: Page
): Promise<Page> {

    const pages = context.pages();

    console.log('TOTAL PAGES:', pages.length);

    for (let i = 0; i < pages.length; i++) {
        console.log(`PAGE ${i} URL:`, pages[i].url());
    }

    if (pages.length <= 1) {
        return currentPage;
    }

    const parentPage = pages[0];

    console.log('PARENT PAGE SELECTED:', parentPage.url());

    await parentPage.bringToFront();

    return parentPage;
}



static async waitforLocatorVisible(locator:Locator,timeout =3000):Promise<void>
{

    await locator.waitFor({state:'visible',timeout})
}

    static async clickIfVisible(locator: Locator): Promise<void> {
    if (await locator.isVisible().catch(() => false)) {
    await locator.click();
    }
    }

}
