Feature:About Page Functionality

@about 
Scenario:Verify about page loads Successfully
Given I am on the SDET Unicorns page
Then I Should see the About page Heading "About"



@about 
Scenario:Verify key about page section are visible
Given I am on the SDET Unicorns page
Then I should see the about page section "Our Story"
Then I should see the about page section "Our Mission"

@about
Scenario:Verify the contact link is visible on the About page 
Given I am on the SDET Unicorns page
Then I should see the about page link "Contact us"


