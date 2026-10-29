import{Page,Locator} from'@playwright/test'

const homeUrl = "https://practice.sdetunicorns.com/#get-started";
export class HomePage{
    readonly page:Page;
    readonly mainHeading:Locator;
    readonly specialSaleHeading:Locator;
    readonly learnMoreLink:Locator;
    readonly learnMoreButton :Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.mainHeading = this.page.getByRole('heading',{name:'Think different. Make different.'});
        this.specialSaleHeading = this.page.getByText('Special Sale: Elevate Your SDET Skills! ');
        this.learnMoreLink = this.page.getByRole('link',{name:'Learn more'}).first();
        this.learnMoreButton = this.page.locator('//a[@href="https://sdetunicorns.com/academy"]')

    }

    async navigateToHomePage():Promise<void>
    {
        await this.page.goto(homeUrl,{waitUntil:'domcontentloaded'})
    }

    async clickLearnMoreLink():Promise<void>
    {
        await this.learnMoreButton.click()
    }

    async clickLearnMoreGetNewTab():Promise<Page>
    {
        const [newTab] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.learnMoreLink.click(),
            
        ]);

        await newTab.waitForLoadState();
        return newTab;

    }
        getNavLink(linkName: string): Locator {
            return this.page
                .locator('#zak-primary-nav')
                .getByRole('link', { name: linkName, exact: true })
                .and(this.page.locator(':visible'));
        }

     getPricePlan(planName:string):Locator
    {
                return this.page.getByRole('heading',{name:planName,exact:true})
    }


    async isLearningMoreOpenNewTab():Promise<boolean>
    {

        // const target = await this.learnMoreButton.getAttribute('target')
        // return target === '_blank'

        const target = await this.learnMoreButton.getAttribute('target');
        const href = await this.learnMoreButton.getAttribute('href');
        return target === '_blank';
    }

    getRedirectedPageText(expectedText:string):Locator
    {

        return this.page.getByText(expectedText,{exact:true})
    }


}