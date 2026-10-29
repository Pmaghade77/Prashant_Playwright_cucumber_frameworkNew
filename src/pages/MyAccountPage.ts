import {Page,Locator} from '@playwright/test'
import { BasePage } from './BasePage'

const MY_ACCOUNT_URL = 'https://practice.sdetunicorns.com/my-account/';
export class MyAccountPage extends BasePage
{
    readonly heading:Locator
    readonly loginTab:Locator
    readonly userNameInput:Locator
    readonly passwordInput:Locator
    readonly rememberCheckBox:Locator
    readonly loginButton :Locator
    readonly registerUsername:Locator
    readonly registerPassword:Locator
    readonly registerEmail:Locator  
    readonly registerButton:Locator
    

    constructor(page:Page)
    {
        super(page)
        this.heading = page.locator('h1.zak-page-title')
        this.loginTab = page.getByRole('link', { name: /Log in/i }).first();
        this.userNameInput =page.getByLabel('Username or email address ')
        this.passwordInput = page.locator('#password')
        this.rememberCheckBox = page.locator('#rememberme')
        this.loginButton = page.getByRole('button',{name:'Log in'})
        this.registerUsername = page.locator('#reg_username')
        this.registerEmail= page.locator('#reg_email')
        this.registerPassword = page.locator('#reg_password')
        this.registerButton = page.getByRole('button',{name:'register'})
       

    }


    async navigate ():Promise<void>
    {
        await this.navigateTo(MY_ACCOUNT_URL)
    }

    getPageHeading(headingText:string):Locator
    {
        return this.getHeading(headingText)
    }

    getLoginFormLabel(labeltext:string):Locator
    {
        return this.page.getByText(labeltext,{exact:false}).first()

    }

    async login (username:string,password:string,):Promise<void>
    {
        await this.userNameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async register(username:string,email:string,password:string):Promise<void>
    {
        await this.registerUsername.fill(username)
        await this.registerEmail.fill(email)
        await this.registerPassword.fill(password)
        await this.registerButton.click()
    }
}
