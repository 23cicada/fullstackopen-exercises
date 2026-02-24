const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./test_helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'root',
        username: 'root',
        password: 'root_001',
      },
    })
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'root2',
        username: 'root2',
        password: 'root_002',
      },
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Log in to application" })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'root_001')
      await expect(page.getByText("logged in")).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'root_000')
      await expect(page.getByText("invalid username or password")).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'root_001')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'test_title', 'test_author', 'test_url');
      await expect(page.getByText('Blog created successfully')).toBeVisible();
    })

    test("a blog can be liked", async ({ page }) => {
      await createBlog(page, 'test_title', 'test_author', 'test_url');
      const locator = page.getByText("test_title")

      await locator.getByRole("button", { name: "view" }).click();
      await locator.locator("..").getByRole("button", { name: "like" }).click();
      await expect(locator.locator("..").getByText("likes 1")).toBeVisible();
    })

    test("a blog can be removed", async ({ page }) => {
      await createBlog(page, 'test_title', 'test_author', 'test_url');
      const locator = page.getByText("test_title")
      await locator.getByRole('button', { name: 'view' }).click();
      page.once('dialog', async dialog => {
        await dialog.accept();
      });
      await locator.locator("..").getByRole('button', { name: 'remove' }).click();
      await expect(page.getByText('Blog removed successfully')).toBeVisible();
    })

    test("only the user who added the blog sees the blog's delete button", async ({ page }) => {
      await createBlog(page, 'title_root1', 'author_root1', 'url_root1');
      await page.getByRole('button', { name: 'logout' }).click();
      await loginWith(page, 'root2', 'root_002');
      await expect(page.getByText('title_root1').locator("..").getByRole('button', { name: 'remove' })).toBeHidden();
    })

    test("blogs are arranged in the order according to the likes", async ({ page }) => {
    })
  })
})

