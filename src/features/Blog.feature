Feature: Blog Page Functionality

  @Blog
  Scenario: Verify the blog page loads successfully
    Given I am on the SDET Unicorns blog page
    Then I should see the page heading "Blog"

  @Blog
  Scenario: Verify blog posts are visible on the page
    Given I am on the SDET Unicorns blog page
    Then I should see at least one blog post

  @Blog
  Scenario: Open a blog post from the blog listing
    Given I am on the SDET Unicorns blog page
    When I open the first available blog post
    Then I should see a blog article heading

  @Blog
  Scenario: Search for a blog post
    Given I am on the SDET Unicorns blog page
    When I search for the first available blog post title
    Then I should see search results