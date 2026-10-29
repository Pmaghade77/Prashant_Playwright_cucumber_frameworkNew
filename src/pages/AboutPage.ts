import {Page,Locator} from '@playwright/test'
import { BasePage } from './BasePage'
import { link } from 'node:fs';

const ABOUT_URL = 'https://practice.sdetunicorns.com/about/';


export class AboutPage extends BasePage
{
    readonly pageTitle :Locator
    readonly primaryHeading:Locator

    constructor(page:Page)
    {
        super(page)
        this.pageTitle = this.page.locator('h1.zak-page-title')
        this.primaryHeading = page.getByRole('heading', { name: 'About', exact: true }).first();

    }


    async navigate():Promise<void>
    {

        await this.navigateTo(ABOUT_URL)
    }

    getHeading(headingText:string):Locator
    {
        return this.page.getByRole('heading',{name:new RegExp(headingText,'i')}).first()
    }

    getSection(sectionText:string):Locator
    {
        return this.page.getByRole('heading',{name:new RegExp(sectionText,'i')}).first()
    }

    getLink(linkname:string):Locator
    {
        return this.page.getByRole('link',{name:new RegExp(linkname,'i')}).first()
    }

}


