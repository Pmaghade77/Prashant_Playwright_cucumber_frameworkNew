import{Given,Then,When} from'@cucumber/cucumber'
import { CustomWorld } from '../Support/world';
import { BasePage } from '../pages/BasePage';

import { PlaywrightUtils } from '../Support/PlaywrightUtils';
import { expect } from '@playwright/test'
import playwrightConfig from '../../playwright.config';
import { AboutPage } from '../pages/AboutPage';
import { availableMemory } from 'node:process';
import { SuiteContext } from 'node:test';
import { ContactPage } from '../pages/Contact.page';



let contactPage:ContactPage
Given('I am on the SDET unicorns Contact page', async function (this:CustomWorld) {

     console.log('Before NAVIGATION:', this.page.url());
    contactPage = new ContactPage(this.page)
    await contactPage.navigate()

     console.log('AFTER NAVIGATION:', this.page.url());

});

Then('I should see the contact page heading {string}', async function (this:CustomWorld,expectedtHeadingText:string) {



        console.log('==============================');
        console.log('Expected heading:', expectedtHeadingText);
        console.log('Current URL:', this.page.url());
        console.log('Page title:', await this.page.title());

        console.log(
            'Headings:',
            await this.page.getByRole('heading').allTextContents()
        );

        console.log('==============================');
    const heading = contactPage.getPageHeading(expectedtHeadingText)
    await PlaywrightUtils.waitforLocatorVisible(contactPage.heading)
    await expect(heading).toBeVisible()
   
});


Then('I should see the contact form visible',async  function (this:CustomWorld) {

    await PlaywrightUtils.waitforLocatorVisible(contactPage.nameField)
    await PlaywrightUtils.waitforLocatorVisible(contactPage.emailField)
    await PlaywrightUtils.waitforLocatorVisible(contactPage.phoneField)


    await expect(contactPage.nameField).toBeVisible()
    await expect(contactPage.emailField).toBeVisible()
    await expect(contactPage.phoneField).toBeVisible()
  
});



When('I fill the contact form with valid details',async  function (this:CustomWorld,) {

    await contactPage.fillForm(
        {
            name:'Test user',
            email: 'testuser@example.com',
            phone: '1234567890',
            message: 'This is a test message from automation.'
        }
    )

});

Then('I submit the contact form', async function (this:CustomWorld) {
    await contactPage.submitButton.click()
});

Then('verify success message {string}', async function (this:CustomWorld,expectedmessage:string) {

    await contactPage.verifySuccessMessage(expectedmessage)
});

