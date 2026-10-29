import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './BasePage'
import { link } from 'node:fs';

const SHOP_URL = 'https://practice.sdetunicorns.com/shop/';


export class ShopPage extends BasePage
{

    readonly shopTitle :Locator
    readonly productTitles:Locator
    readonly categoryLinks:Locator


    constructor(page:Page)
    {
        super(page)
        this.shopTitle = page.locator('h1.zak-page-title')
        this.productTitles =page.locator('h2.woocommerce-loop-product__title')
        this.categoryLinks=page.locator('//li/a[contains(@href,"https://practice.sdetunicorns.com/product-category/")]')
    }


    async navigate():Promise<void>
    {

        await this.navigateTo(SHOP_URL)
    }

    getPageHeading(headingText:string):Locator
    {
        return  this.getHeading(headingText)
    }

    async getProductTitle():Promise<string[]>
    {
        return await this.productTitles.allTextContents()
    }


 getCategoryLink(categoryName:string):Locator
{

    return   this.categoryLinks.filter({hasText:new RegExp(categoryName,'i')}).first()

}



}