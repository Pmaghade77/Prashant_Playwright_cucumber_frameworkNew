import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './BasePage'
import { link } from 'node:fs';

const CONTACT_URL = 'https://practice.sdetunicorns.com/contact/';


export class ContactPage extends BasePage
{

    readonly pageTitle:Locator
    readonly heading :Locator
    readonly form :Locator
    readonly nameField :Locator
    readonly emailField :Locator
    readonly phoneField :Locator
    readonly messageField:Locator
    readonly submitButton :Locator
    readonly successMessage :Locator








    constructor (page:Page)
    {
        super(page)
        this.pageTitle = page.locator('h1.zak-page-title')
        this.heading = page.getByRole('heading',{name:'Contact'}).first()
        this.form = page.locator('form').filter({has:page.locator('input[name*="everest_forms[form_fields]"]')}).first()
        this.nameField = page.locator('input[name="everest_forms[form_fields][ys0GeZISRs-1]"]').first()
        this.emailField= page.locator('input[name="everest_forms[form_fields][LbH5NxasXM-2]"]').first()
        this.phoneField = page.locator('input[name="everest_forms[form_fields][66FR384cge-3]"]').first()
        this.messageField= page.locator('textarea[name*="[yhGx3FOwr2-4]"]').first()
        this.submitButton =page.locator('button[name="everest_forms[submit]"]').first()
        this.successMessage= page.locator('div[role="alert"]').first()


    }

    async navigate():Promise<void>
    {
       await  this.navigateTo(CONTACT_URL)
    }

    getPageHeading(headingText:string):Locator
    {
        return this.getHeading(headingText)

    }

    getField(labelText:string):Locator
    {
        return this.page.getByLabel(new RegExp(labelText,'i')).first()
    }

    async fillForm(data:{name:string,email:string,phone:string,message:string}):Promise<void>
    {
        await this.nameField.fill(data.name)
        await this.emailField.fill(data.email)
        await this.phoneField.fill(data.phone)
        await this.messageField.fill(data.message)
    }


    async submit():Promise<void>
    {

        await this.submitButton.waitFor({state:'visible' })
        await this.submitButton.click({force:true})
    }

    async verifySuccessMessage(message:string):Promise<void>
    {
        return await expect ( this.successMessage).toHaveText(message)
    }


}


