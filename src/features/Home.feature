Feature: HomePage Functionality

@Login
Scenario: Verify HomePage Loads Successfully

Given I am on the SDET Unicorn HomePage
Then I should see the HomePage Heading "Think different. Make different."
And I should see the Special Sale Heading "Special Sale: Elevate Your SDET Skills!"


@data 
Scenario Outline: Verify homepage navigate links are visible

Given I am on the SDET Unicorn HomePage
Then I should see Home Navigation link "<linkname>"

Examples:
    |linkname| 
    |Home|
    |About|
    |Shop|
    |Blog|
    |Contact|
    |My account|

@datatable 
Scenario:Verify the home loads successfully
Given I am on the SDET Unicorn HomePage
Then I should see the following pricing plans:
|planName|
|Silver|
|Gold|
|Platinum|


@learnmore
Scenario:click on lear more
Given I am on the SDET Unicorn HomePage
When I click on the "Learn more" button
Then I should see the redirected page text "Academy Access"
When I am return to the Parent website
Then I should see the HomePage Heading "Think different. Make different."

