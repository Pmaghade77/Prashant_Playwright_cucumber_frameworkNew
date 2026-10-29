
import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../Support/world';
import { BlogPage } from '../pages/BlogPage';
import { expect } from '@playwright/test';

let blogPage: BlogPage;

Given(
  'I am on the SDET Unicorns blog page',
  async function (this: CustomWorld) {
    blogPage = new BlogPage(this.page);
    await blogPage.navigate();
  }
);

Then(
  'I should see the page heading {string}',
  async function (this: CustomWorld, expectedHeading: string) {
    await expect(blogPage.pageTitle).toHaveText(expectedHeading);
  }
);

Then(
  'I should see at least one blog post',
  async function (this: CustomWorld) {
    await expect(blogPage.posts.first()).toBeVisible();
    expect(await blogPage.getPostCount()).toBeGreaterThan(0);
  }
);

When(
  'I open the first available blog post',
  async function (this: CustomWorld) {
    const firstPost = blogPage.postTitles.first();
    await expect(firstPost).toBeVisible();
    await firstPost.click();
    await expect(blogPage.articleTitle).toBeVisible();
  }
);

Then(
  'I should see a blog article heading',
  async function (this: CustomWorld) {
    await expect(blogPage.articleTitle).toBeVisible();
    await expect(blogPage.articleTitle).not.toBeEmpty();
  }
);

When(
  'I search for the first available blog post title',
  async function (this: CustomWorld) {
    const titles = await blogPage.getPostTitles();
    expect(titles.length).toBeGreaterThan(0);

    const firstTitle = titles[0].trim();
    await blogPage.search(firstTitle);
  }
);

Then(
  'I should see search results',
  async function (this: CustomWorld) {
    await expect(blogPage.posts.first()).toBeVisible();
    expect(await blogPage.getPostCount()).toBeGreaterThan(0);
  }
);
