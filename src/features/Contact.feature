Feature:Contact Page Functionality 

@Contact
Scenario:Verify the contact page loads successfully 
Given I am on the SDET unicorns Contact page 
Then I should see the contact page heading "Contact"


@Contact
Scenario:Verify the contact form is visible
Given I am on the SDET unicorns Contact page 
Then I should see the contact form visible


@Contact
Scenario:Submit the contact form with Valid data 
Given I am on the SDET unicorns Contact page 
When I fill the contact form with valid details
Then I submit the contact form
Then verify success message 'Thanks for contacting us! We will be in touch with you shortly'