const { expect } = require('@playwright/test')

const loginWith = async (page, username, password) => {
  await page.getByRole('link', { name: "Login" }).click()
  await expect(page).toHaveURL("/login")
  await page.getByLabel("Username").fill(username)
  await page.getByLabel("Password").fill(password)
  await page.getByRole("button", { name: "Login" }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole("link", { name: "new blog" }).click()
  await expect(page).toHaveURL("/create")
  await page.getByRole('textbox', { name: 'Title' }).fill(title)
  await page.getByRole('textbox', { name: 'Author' }).fill(author)
  await page.getByRole('textbox', { name: 'Url' }).fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }
