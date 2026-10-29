Feature:Blog Page Functionality



@Blog
Scenario:Verify the blog page loads Successfully 
Given I am on the SDET Unicorns blog page
Then I should see the page heading "Blog" 


@Blog 
Scenario:verify blog posts are visible on the page 
Given I am on the SDET Unicorns blog page
Then I should see the following blog posts:
|postTitle                                              |
|IFrame Sample                                          |
|Successful Marketing Ads for Your Business             |

When I click on Older Posts

Then I should see the following blog posts:
  | postTitle |
  | Let’s Building Your Business from Scratch |
  | The Best Place to Invest Your Money |
  | The Big Seminar for Your Right Investment |


@Blog 
Scenario:Open a blog post from blog listing
Given I am on the SDET Unicorns blog page
When I open a blog post "Successful Marketing Ads for Your Business"
Then I should see the blog article heading "Successful Marketing Ads for Your Business"


@Blog
Scenario: Search for a blog post
Given I am on the SDET Unicorns blog page
When I search for "marketing"
Then I should see the blog article heading "Successful Marketing Ads for Your Business"
