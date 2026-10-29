Feature: My Account Page Functionality 

@myaccount 
Scenario:Verify the my account page loads successfully
Given I am on the sdet unicorns my account page
Then I should see the my account page heading "My account"

@myaccount
Scenario:Verify the login form is visible
Given I am on the sdet unicorns my account page
Then I should see the login form fields


@myaccount
Scenario:Verify the register form is visible 
Given I am on the sdet unicorns my account page
Then I should see the resgister form fields


@login 
Scenario:Verify user is able to login with valid user
Given I am on the sdet unicorns my account page
When I login with username "dpx11" and password "Dpx11@1234567890"
Then I should see my account dashboard


@register
Scenario:Verify user is able to register Successfully
Given I am on the sdet unicorns my account page
When I enter username 'dpx13' and email 'dpxtesting@gmail.com' and password 'Dpx13@1234567890' 
Then I should see my account dashboard

