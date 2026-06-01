const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./test_helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'test_user',
        username: 'test_user',
        password: 'test5555#',
      },
    })
    await page.goto('/')
  })

  test("Login succeeds with the correct username/password combination", async ({ page }) => {
    await loginWith(page, 'test_user', 'test5555#')
    await expect(page).toHaveURL("/")
    await expect(await page.getByRole("button", { name: "Logout" })).toBeVisible()
  })

  test("Login fails if the username/password is incorrect", async ({ page }) => {
    await loginWith(page, 'test_user', 'test5555##')
    await expect(page.getByText("invalid username or password")).toBeVisible()
  })

  test("A logged-in user can create a blog", async ({ page }) => {
    await loginWith(page, 'test_user', 'test5555#')
    await createBlog(page, 'Test Blog Title', 'Test Author', 'https://test.com')
    await expect(await page.getByText('Test Blog Title')).toBeVisible()
  })

  test("A logged-in user can like blogs", async ({ page }) => {
    await loginWith(page, 'test_user', 'test5555#')
    await createBlog(page, 'Test Blog Title', 'Test Author', 'https://test.com')
    await page.getByRole("link", { name: "Test Blog Title" }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await expect(await page.getByText('likes 1')).toBeVisible()
  })

  test("A logged-in user can delete a blog", async ({ page }) => {
    await loginWith(page, 'test_user', 'test5555#')
    await createBlog(page, 'Test Blog Title', 'Test Author', 'https://test.com')
    await page.getByRole("link", { name: "Test Blog Title" }).click()
    await page.getByRole('button', { name: 'remove' }).click()
    await expect(await page.getByText('Test Blog Title')).toBeHidden()
  })
})

