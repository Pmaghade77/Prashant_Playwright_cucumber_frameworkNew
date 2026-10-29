Feature:Shop Page Functionality 

@Shop
Scenario:verify the shop page loads successfully 
Given I am on the SDET Unicorns shop page
Then I should see the shop page heading "Shop"


@Shop 
Scenario:verify products are displayed on shop page 
Given I am on the SDET Unicorns shop page
Then I should see the following products:
|productName|
|Branded Converse|
|Canon Antique Camera|
|Converse|
|Headphone|
|Ladies Jeans|
|Mini Speaker|



@Shop 
Scenario:verify the product categories are visible 
Given I am on the SDET Unicorns shop page
Then I should see the product category "Clothes"
Then I should see the product category "Shoes"
Then I should see the product category "Watch"




